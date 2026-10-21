import { useEffect, useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { exerciseApi, submissionApi, noteApi } from '../api/services';
import { runPython, runTestCases } from '../utils/pythonRunner';
import CodeEditor from '../components/CodeEditor';
import ChatbotPanel from '../components/ChatbotPanel';
import CodeVisualizer from '../components/CodeVisualizer';

export default function ExerciseWorkspace() {
  const { id } = useParams();
  const [ex, setEx] = useState(null);
  const [code, setCode] = useState('');
  const [errorText, setErrorText] = useState('');
  const [hints, setHints] = useState([]);
  const [solution, setSolution] = useState(null);
  const [msg, setMsg] = useState(null);
  const [activeTab, setActiveTab] = useState('problem'); // 'problem' | 'notes'
  const [note, setNote] = useState('');
  const [noteSaved, setNoteSaved] = useState(false);

  // Trạng thái chạy code & test cases
  const [isRunning, setIsRunning] = useState(false);
  const [runTab, setRunTab] = useState('console'); // 'console' | 'tests'
  const [consoleOutput, setConsoleOutput] = useState(null);
  const [testResults, setTestResults] = useState(null);

  const codeRef = useRef('');
  const errRef = useRef('');

  codeRef.current = code;
  errRef.current = errorText;

  useEffect(() => {
    exerciseApi.get(id).then((e) => {
      setEx(e);
      const savedDraft = localStorage.getItem(`draft_${e.id}`);
      setCode(savedDraft ?? e.starterCode ?? '');
    });
    exerciseApi.hints(id).then((h) => setHints(h.hints));
    noteApi.get(`ex_${id}`).then((n) => setNote(n || ''));
    setSolution(null);
    setMsg(null);
    setConsoleOutput(null);
    setTestResults(null);
  }, [id]);

  if (!ex) return <div className="loading-state">Đang tải bài tập...</div>;

  const allHintsUsed = hints.length >= (ex.hints?.length || 0);

  // Chạy thử mã tự do
  async function handleRunCode() {
    setIsRunning(true);
    setRunTab('console');
    setMsg(null);
    try {
      const res = await runPython(code);
      setConsoleOutput(res);
      if (!res.success && res.error) {
        setErrorText(res.error);
      }
    } catch (err) {
      setConsoleOutput({ success: false, stdout: '', error: err.message, durationMs: 0 });
      setErrorText(err.message);
    } finally {
      setIsRunning(false);
    }
  }

  // Chạy kiểm tra bộ test cases
  async function handleRunTests() {
    setIsRunning(true);
    setRunTab('tests');
    setMsg(null);
    try {
      const results = await runTestCases(code, ex.testCases || []);
      setTestResults(results);
      if (results.passed) {
        setMsg({ type: 'ok', text: '🎉 Tuyệt vời! Bạn đã vượt qua tất cả các test cases.' });
      } else {
        setMsg({ type: 'warn', text: 'Một số test case chưa vượt qua. Vui lòng kiểm tra lại kết quả đầu ra.' });
      }
    } catch (err) {
      setMsg({ type: 'error', text: `Lỗi khi chạy test case: ${err.message}` });
    } finally {
      setIsRunning(false);
    }
  }

  async function nextHint() {
    try {
      const h = await exerciseApi.useHint(ex.id);
      setHints(h.hints);
    } catch (e) {
      setMsg({ type: 'error', text: e.message });
    }
  }

  async function showSolution() {
    if (!window.confirm('Xem lời giải sẽ làm mất cơ hội tự suy nghĩ. Bạn có chắc chắn muốn xem?')) return;
    try {
      const r = await exerciseApi.solution(ex.id);
      setSolution(r.solution);
    } catch (e) {
      setMsg({ type: 'error', text: e.message });
    }
  }

  function saveDraft() {
    localStorage.setItem(`draft_${ex.id}`, code);
    setMsg({ type: 'info', text: 'Đã lưu bản nháp vào trình duyệt.' });
    setTimeout(() => setMsg(null), 3000);
  }

  function resetCode() {
    if (window.confirm('Bạn có chắc muốn khôi phục mã nguồn ban đầu của bài tập?')) {
      setCode(ex.starterCode || '');
      localStorage.removeItem(`draft_${ex.id}`);
      setMsg({ type: 'info', text: 'Đã khôi phục mã nguồn ban đầu.' });
    }
  }

  async function savePersonalNote() {
    await noteApi.save(`ex_${id}`, note);
    setNoteSaved(true);
    setTimeout(() => setNoteSaved(false), 2000);
  }

  async function submit() {
    if (!code.trim()) return setMsg({ type: 'error', text: 'Bạn chưa nhập mã nguồn.' });

    // Kiểm tra test cases trước khi nộp
    setIsRunning(true);
    const tests = await runTestCases(code, ex.testCases || []);
    setIsRunning(false);
    setTestResults(tests);
    setRunTab('tests');

    if (!tests.passed) {
      if (
        !window.confirm(
          'Mã nguồn của bạn chưa vượt qua hết các test case. Bạn có chắc chắn muốn nộp để người hướng dẫn góp ý?'
        )
      ) {
        return;
      }
    }

    try {
      await submissionApi.create({ exerciseId: ex.id, code });
      setMsg({
        type: 'ok',
        text: 'Nộp bài thành công! Bạn nhận được +30 XP. Hãy theo dõi phản hồi từ Người hướng dẫn tại trang "Bài đã nộp".',
      });
      setEx({ ...ex, done: true });
    } catch (e) {
      setMsg({ type: 'error', text: e.message });
    }
  }

  return (
    <div className="workspace-page">
      <div className="workspace-header">
        <Link to="/topics" className="back-link">
          ← Danh sách chủ đề
        </Link>
        <div className="title-row">
          <h1>{ex.title}</h1>
          <div className="badge-group">
            <span
              className={`badge difficulty ${
                ex.difficulty === 'Dễ' ? 'badge-easy' : ex.difficulty === 'Trung bình' ? 'badge-med' : 'badge-hard'
              }`}
            >
              {ex.difficulty}
            </span>
            {ex.done ? (
              <span className="badge badge-success">✓ Đã nộp bài</span>
            ) : (
              <span className="badge badge-neutral">Chưa nộp</span>
            )}
          </div>
        </div>
      </div>

      <div className="workspace">
        <div className="workspace-left">
          {/* Tabs chuyển đổi Đề bài & Ghi chú */}
          <div className="workspace-tabs">
            <button
              className={`ws-tab ${activeTab === 'problem' ? 'active' : ''}`}
              onClick={() => setActiveTab('problem')}
            >
              📖 Đề bài & Yêu cầu
            </button>
            <button
              className={`ws-tab ${activeTab === 'notes' ? 'active' : ''}`}
              onClick={() => setActiveTab('notes')}
            >
              📝 Ghi chú cá nhân {note.trim() ? '•' : ''}
            </button>
          </div>

          {activeTab === 'problem' ? (
            <section className="card problem-card">
              <div className="problem-desc" style={{ whiteSpace: 'pre-wrap' }}>
                {ex.description}
              </div>
            </section>
          ) : (
            <section className="card notes-card">
              <textarea
                rows={4}
                className="note-textarea"
                placeholder="Ghi chú lại những ý tưởng, mẹo hoặc công thức cho bài tập này..."
                value={note}
                onChange={(e) => setNote(e.target.value)}
              />
              <div className="actions" style={{ marginTop: '0.5rem' }}>
                <button className="btn small-btn" onClick={savePersonalNote}>
                  {noteSaved ? '✓ Đã lưu ghi chú' : 'Lưu ghi chú'}
                </button>
              </div>
            </section>
          )}

          {/* Trình soạn thảo Monaco Editor */}
          <div className="editor-section">
            <CodeEditor
              value={code}
              onChange={setCode}
              language="python"
              height="360px"
              onRun={handleRunCode}
              title="solution.py"
            />
          </div>

          {/* Thanh công cụ thao tác */}
          <div className="run-actions-bar">
            <div className="left-actions">
              <button
                className="btn btn-run"
                disabled={isRunning}
                onClick={handleRunCode}
                title="Phím tắt: Ctrl + Enter"
              >
                {isRunning ? '⏳ Đang chạy...' : '▶ Chạy thử mã'}
              </button>
              <button
                className="btn btn-test"
                disabled={isRunning}
                onClick={handleRunTests}
              >
                🧪 Kiểm tra Test Cases
              </button>
            </div>
            <div className="right-actions">
              <button className="btn ghost small-btn" onClick={resetCode} title="Khôi phục mã ban đầu">
                ↺ Khôi phục
              </button>
              <button className="btn ghost small-btn" onClick={saveDraft}>
                💾 Lưu nháp
              </button>
              <button className="btn btn-submit" onClick={submit}>
                📤 Nộp bài (+30 XP)
              </button>
            </div>
          </div>

          {msg && <div className={`alert ${msg.type}`}>{msg.text}</div>}

          {/* Panel Kết quả Terminal / Test Cases */}
          <div className="output-panel card">
            <div className="output-panel-header">
              <div className="output-tabs">
                <button
                  className={`out-tab ${runTab === 'console' ? 'active' : ''}`}
                  onClick={() => setRunTab('console')}
                >
                  🖥️ Console Terminal
                </button>
                <button
                  className={`out-tab ${runTab === 'tests' ? 'active' : ''}`}
                  onClick={() => setRunTab('tests')}
                >
                  🧪 Test Cases{' '}
                  {testResults && (
                    <span className={`pill ${testResults.passed ? 'pill-ok' : 'pill-err'}`}>
                      {testResults.results.filter((r) => r.passed).length}/{testResults.results.length}
                    </span>
                  )}
                </button>
                <button
                  className={`out-tab ${runTab === 'visualizer' ? 'active' : ''}`}
                  onClick={() => setRunTab('visualizer')}
                >
                  🔍 Visualizer Bộ nhớ
                </button>
              </div>
              {consoleOutput && runTab === 'console' && (
                <span className="exec-time">Thời gian: {consoleOutput.durationMs}ms</span>
              )}
            </div>

            <div className="output-panel-body">
              {runTab === 'visualizer' ? (
                <CodeVisualizer code={code} language="python" />
              ) : runTab === 'console' ? (
                consoleOutput ? (
                  <div className="console-view">
                    {consoleOutput.stdout && (
                      <pre className="terminal-stdout">{consoleOutput.stdout}</pre>
                    )}
                    {consoleOutput.error && (
                      <pre className="terminal-stderr">{consoleOutput.error}</pre>
                    )}
                    {!consoleOutput.stdout && !consoleOutput.error && (
                      <div className="muted small">Chương trình kết thúc thành công, không in dữ liệu ra stdout.</div>
                    )}
                  </div>
                ) : (
                  <div className="terminal-placeholder">
                    Nhấn <b>"Chạy thử mã"</b> (hoặc phím tắt <code>Ctrl + Enter</code>) để thực thi chương trình và xem kết quả tại đây.
                  </div>
                )
              ) : testResults ? (
                <div className="test-cases-list">
                  {testResults.results.map((tc) => (
                    <div key={tc.id} className={`test-case-card ${tc.passed ? 'pass' : 'fail'}`}>
                      <div className="test-case-title">
                        <span className="tc-status">{tc.passed ? '✅ ĐẠT' : '❌ CHƯA ĐẠT'}</span>
                        <span className="tc-desc">{tc.description}</span>
                        <span className="tc-time">{tc.execTimeMs}ms</span>
                      </div>
                      <div className="test-case-detail">
                        {tc.input && tc.input !== '(Trống)' && (
                          <div className="tc-row">
                            <span className="tc-label">Đầu vào:</span>
                            <code>{tc.input}</code>
                          </div>
                        )}
                        <div className="tc-row">
                          <span className="tc-label">Kết quả mong đợi:</span>
                          <code>{tc.expected}</code>
                        </div>
                        <div className="tc-row">
                          <span className="tc-label">Thực tế in ra:</span>
                          <code className={tc.passed ? 'txt-ok' : 'txt-err'}>{tc.actual}</code>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="terminal-placeholder">
                  Nhấn <b>"Kiểm tra Test Cases"</b> để chấm tự động mã nguồn với các bộ dữ liệu mẫu.
                </div>
              )}
            </div>
          </div>

          {/* Ô nhập thông báo lỗi gửi chatbot */}
          <label className="block error-box">
            <span className="error-box-title">🐞 Dán thông báo lỗi vào đây để Trợ lý AI giải thích & phân tích:</span>
            <textarea
              rows={2}
              value={errorText}
              onChange={(e) => setErrorText(e.target.value)}
              placeholder="Ví dụ: IndentationError: expected an indented block hoặc TypeError..."
            />
          </label>

          {/* Hệ thống gợi ý từng bước & Lời giải */}
          <section className="card hints-card">
            <div className="between">
              <h2>Gợi ý từng bước ({hints.length}/{ex.hints?.length || 0})</h2>
              {allHintsUsed && <span className="badge badge-success">Đã mở hết gợi ý</span>}
            </div>

            {hints.map((h, i) => (
              <div key={i} className="hint">
                <span className="hint-num">Gợi ý {i + 1}:</span> {h}
              </div>
            ))}

            <div className="actions" style={{ marginTop: '1rem' }}>
              <button className="btn ghost" disabled={allHintsUsed} onClick={nextHint}>
                {allHintsUsed ? '✓ Đã mở hết gợi ý' : '💡 Xem gợi ý tiếp theo'}
              </button>
              <button
                className="btn danger"
                disabled={!allHintsUsed || !!solution}
                onClick={showSolution}
              >
                🔓 Xem lời giải mẫu
              </button>
            </div>

            {!allHintsUsed && (
              <p className="muted small" style={{ marginTop: '0.5rem' }}>
                * Lời giải mẫu chỉ được mở sau khi bạn đã mở hết tất cả các gợi ý gợi mở tư duy.
              </p>
            )}

            {solution && (
              <div className="solution-box" style={{ marginTop: '1rem' }}>
                <h3 className="solution-title">Lời giải mẫu tham khảo:</h3>
                <CodeEditor value={solution} readOnly height="200px" title="solution_reference.py" />
              </div>
            )}
          </section>
        </div>

        {/* Cột phải: Trợ lý Chatbot AI */}
        <div className="workspace-right">
          <ChatbotPanel
            contextKey={`ex-${ex.id}`}
            contextLabel={`Bài tập: ${ex.title}`}
            getCode={() => codeRef.current}
            getError={() => errRef.current}
            onInsertCode={(newCode) => setCode(newCode)}
          />
        </div>
      </div>
    </div>
  );
}
