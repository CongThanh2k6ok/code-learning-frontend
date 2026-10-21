import { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { lessonApi, exerciseApi, noteApi } from '../api/services';
import { runPython } from '../utils/pythonRunner';
import CodeEditor from '../components/CodeEditor';
import ChatbotPanel from '../components/ChatbotPanel';

export default function LessonDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [lesson, setLesson] = useState(null);
  const [allLessons, setAllLessons] = useState([]);
  const [relatedExercises, setRelatedExercises] = useState([]);
  const [code, setCode] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [output, setOutput] = useState(null);
  const [completed, setCompleted] = useState(false);
  const [msg, setMsg] = useState(null);
  const [note, setNote] = useState('');
  const [noteSaved, setNoteSaved] = useState(false);
  const [activeTab, setActiveTab] = useState('example'); // 'example' | 'notes'

  useEffect(() => {
    lessonApi.get(id).then((l) => {
      setLesson(l);
      setCode(l?.example || '');
      setCompleted(l?.completed || false);
      if (l?.topicId) {
        lessonApi.list(l.topicId).then(setAllLessons);
        exerciseApi.list(l.topicId).then(setRelatedExercises);
      }
    });
    noteApi.get(`lesson_${id}`).then((n) => setNote(n || ''));
    setOutput(null);
    setMsg(null);
  }, [id]);

  if (!lesson) return <div className="loading-state">Đang tải bài học...</div>;

  const currentIndex = allLessons.findIndex((l) => l.id === lesson.id);
  const prevLesson = currentIndex > 0 ? allLessons[currentIndex - 1] : null;
  const nextLesson = currentIndex >= 0 && currentIndex < allLessons.length - 1 ? allLessons[currentIndex + 1] : null;

  async function handleRunExample() {
    setIsRunning(true);
    try {
      const res = await runPython(code);
      setOutput(res);
    } catch (err) {
      setOutput({ success: false, stdout: '', error: err.message, durationMs: 0 });
    } finally {
      setIsRunning(false);
    }
  }

  async function handleMarkComplete() {
    try {
      await lessonApi.markComplete(lesson.id);
      setCompleted(true);
      setMsg({ type: 'ok', text: '🎉 Chúc mừng bạn đã hoàn thành bài học và nhận được +15 XP!' });
    } catch (err) {
      setMsg({ type: 'error', text: err.message });
    }
  }

  async function handleSaveNote() {
    await noteApi.save(`lesson_${id}`, note);
    setNoteSaved(true);
    setTimeout(() => setNoteSaved(false), 2000);
  }

  return (
    <div className="lesson-page">
      <div className="lesson-header">
        <Link to="/topics" className="back-link">
          ← Danh sách chủ đề
        </Link>
        <div className="title-row">
          <h1>{lesson.title}</h1>
          <div className="badge-group">
            {lesson.readTime && <span className="badge badge-neutral">⏱ {lesson.readTime}</span>}
            {completed ? (
              <span className="badge badge-success">✓ Đã học xong</span>
            ) : (
              <button className="btn small-btn btn-complete" onClick={handleMarkComplete}>
                ✓ Đánh dấu đã học (+15 XP)
              </button>
            )}
          </div>
        </div>
      </div>

      {msg && <div className={`alert ${msg.type}`}>{msg.text}</div>}

      <div className="workspace">
        <div className="lesson-left">
          {/* Nội dung bài học */}
          <article className="card lesson-content-card">
            <div className="markdown-body" style={{ whiteSpace: 'pre-wrap', lineHeight: 1.7 }}>
              {lesson.content}
            </div>
          </article>

          {/* Tabs Ví dụ tương tác / Ghi chú */}
          <div className="workspace-tabs" style={{ marginTop: '1.5rem' }}>
            <button
              className={`ws-tab ${activeTab === 'example' ? 'active' : ''}`}
              onClick={() => setActiveTab('example')}
            >
              💻 Ví dụ minh họa tương tác
            </button>
            <button
              className={`ws-tab ${activeTab === 'notes' ? 'active' : ''}`}
              onClick={() => setActiveTab('notes')}
            >
              📝 Sổ tay ghi chú {note.trim() ? '•' : ''}
            </button>
          </div>

          {activeTab === 'example' ? (
            <div className="example-box">
              <p className="muted small" style={{ marginBottom: '0.5rem' }}>
                * Bạn có thể tự do chỉnh sửa đoạn mã bên dưới và bấm <b>"Chạy thử ví dụ"</b> để xem kết quả ngay lập tức:
              </p>
              <CodeEditor
                value={code}
                onChange={setCode}
                language="python"
                height="280px"
                onRun={handleRunExample}
                title="example.py"
              />

              <div className="run-actions-bar" style={{ marginTop: '0.5rem' }}>
                <button
                  className="btn btn-run"
                  disabled={isRunning}
                  onClick={handleRunExample}
                >
                  {isRunning ? '⏳ Đang chạy...' : '▶ Chạy thử ví dụ'}
                </button>
                <button
                  className="btn ghost small-btn"
                  onClick={() => {
                    setCode(lesson.example || '');
                    setOutput(null);
                  }}
                >
                  ↺ Đặt lại ví dụ gốc
                </button>
              </div>

              {output && (
                <div className="console-view card" style={{ marginTop: '0.75rem' }}>
                  <div className="terminal-header between">
                    <span className="small">Kết quả thực thi (stdout):</span>
                    <span className="exec-time">{output.durationMs}ms</span>
                  </div>
                  {output.stdout && <pre className="terminal-stdout">{output.stdout}</pre>}
                  {output.error && <pre className="terminal-stderr">{output.error}</pre>}
                  {!output.stdout && !output.error && (
                    <div className="muted small">Chương trình chạy thành công, không in ra màn hình.</div>
                  )}
                </div>
              )}
            </div>
          ) : (
            <div className="card notes-card">
              <textarea
                rows={5}
                className="note-textarea"
                placeholder="Ghi lại các cú pháp, mẹo nhớ hoặc thắc mắc về bài học này..."
                value={note}
                onChange={(e) => setNote(e.target.value)}
              />
              <div className="actions" style={{ marginTop: '0.5rem' }}>
                <button className="btn small-btn" onClick={handleSaveNote}>
                  {noteSaved ? '✓ Đã lưu ghi chú' : 'Lưu ghi chú'}
                </button>
              </div>
            </div>
          )}

          {/* Danh sách bài tập thực hành liên quan */}
          {relatedExercises.length > 0 && (
            <section className="card related-ex-card" style={{ marginTop: '1.5rem' }}>
              <h2>Bài tập thực hành cho chủ đề này</h2>
              <div className="related-list">
                {relatedExercises.map((ex) => (
                  <Link key={ex.id} to={`/exercises/${ex.id}`} className="list-item between hover-item">
                    <span>
                      <b>{ex.title}</b> <span className="muted small">({ex.difficulty})</span>
                    </span>
                    {ex.done ? (
                      <span className="badge badge-success">✓ Đã làm</span>
                    ) : (
                      <span className="badge badge-primary">Luyện tập ngay →</span>
                    )}
                  </Link>
                ))}
              </div>
            </section>
          )}

          {/* Điều hướng chuyển bài học Trước / Sau */}
          <div className="lesson-nav between" style={{ marginTop: '1.5rem' }}>
            {prevLesson ? (
              <button
                className="btn ghost"
                onClick={() => navigate(`/lessons/${prevLesson.id}`)}
              >
                ← Bài trước: {prevLesson.title}
              </button>
            ) : (
              <div></div>
            )}
            {nextLesson && (
              <button
                className="btn"
                onClick={() => navigate(`/lessons/${nextLesson.id}`)}
              >
                Bài tiếp theo: {nextLesson.title} →
              </button>
            )}
          </div>
        </div>

        {/* Cột phải: Trợ lý Chatbot AI */}
        <div className="lesson-right">
          <ChatbotPanel
            contextKey={`lesson-${lesson.id}`}
            contextLabel={`Bài học: ${lesson.title}`}
            getCode={() => code}
            onInsertCode={(newCode) => setCode(newCode)}
          />
        </div>
      </div>
    </div>
  );
}
