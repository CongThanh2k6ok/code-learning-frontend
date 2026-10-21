import React, { useState, useEffect } from 'react';

/**
 * Trình trực quan hóa thực thi mã nguồn & phân tích bộ nhớ từng bước (Step-by-step Visualizer)
 * Mô phỏng quá trình thực thi: Call Stack, Scope biến số và Heap Memory
 */
export default function CodeVisualizer({ code, language = 'python' }) {
  const [steps, setSteps] = useState([]);
  const [currentStepIdx, setCurrentStepIdx] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  // Phân tích mã nguồn thành chuỗi các bước thực thi mô phỏng
  useEffect(() => {
    if (!code) {
      setSteps([]);
      return;
    }

    const lines = code.split('\n');
    const parsedSteps = [];
    const scopeVariables = {};

    let stepCount = 0;
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();
      if (!line || line.startsWith('#') || line.startsWith('//')) continue;

      // Phân tích gán biến đơn giản: x = 10, name = "Alice", items = [1, 2, 3]
      const assignMatch = line.match(/^([a-zA-Z_][a-zA-Z0-9_]*)\s*=\s*(.*)$/);
      if (assignMatch) {
        const varName = assignMatch[1];
        const valStr = assignMatch[2];
        let valType = 'string';
        let val = valStr;

        if (/^-?\d+$/.test(valStr)) {
          valType = 'int';
          val = parseInt(valStr, 10);
        } else if (/^-?\d+\.\d+$/.test(valStr)) {
          valType = 'float';
          val = parseFloat(valStr);
        } else if (valStr.startsWith('[') && valStr.endsWith(']')) {
          valType = 'list';
          val = valStr;
        } else if (valStr === 'True' || valStr === 'False') {
          valType = 'bool';
          val = valStr === 'True';
        }

        scopeVariables[varName] = { val, type: valType };
      }

      stepCount++;
      parsedSteps.push({
        stepNum: stepCount,
        lineNum: i + 1,
        lineCode: lines[i],
        callStack: ['<module> / main()'],
        variables: { ...scopeVariables },
        stdout: line.includes('print') ? `[Output] In dòng lệnh ${i + 1}` : null,
      });

      if (stepCount >= 30) break; // giới hạn tối đa 30 bước mô phỏng
    }

    if (parsedSteps.length === 0) {
      parsedSteps.push({
        stepNum: 1,
        lineNum: 1,
        lineCode: code.split('\n')[0] || '',
        callStack: ['<module>'],
        variables: {},
        stdout: null,
      });
    }

    setSteps(parsedSteps);
    setCurrentStepIdx(0);
    setIsPlaying(false);
  }, [code]);

  // Tự động chạy
  useEffect(() => {
    let interval = null;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentStepIdx((prev) => {
          if (prev >= steps.length - 1) {
            setIsPlaying(false);
            return prev;
          }
          return prev + 1;
        });
      }, 900);
    }
    return () => clearInterval(interval);
  }, [isPlaying, steps.length]);

  const currentStep = steps[currentStepIdx] || {
    stepNum: 1,
    lineNum: 1,
    lineCode: '',
    callStack: ['<module>'],
    variables: {},
  };

  const codeLines = (code || '').split('\n');

  return (
    <div className="code-visualizer-root card">
      <div className="between visualizer-header">
        <div className="row-center gap-2">
          <span style={{ fontSize: '1.25rem' }}>🔍</span>
          <div>
            <h3 style={{ margin: 0, fontSize: '1.05rem' }}>Trực Quan Hóa Bộ Nhớ & Thực Thi (Visualizer)</h3>
            <span className="small muted">Xem biến đổi giá trị biến số và ngăn xếp lệnh theo từng dòng</span>
          </div>
        </div>

        <div className="visualizer-controls row-center gap-2">
          <button
            type="button"
            className="btn small-btn ghost"
            onClick={() => setCurrentStepIdx(0)}
            disabled={currentStepIdx === 0}
            title="Về bước đầu"
          >
            ⏮ Đầu
          </button>
          <button
            type="button"
            className="btn small-btn ghost"
            onClick={() => setCurrentStepIdx((p) => Math.max(0, p - 1))}
            disabled={currentStepIdx === 0}
            title="Lùi 1 bước"
          >
            ◀ Lùi
          </button>
          <button
            type="button"
            className={`btn small-btn ${isPlaying ? 'secondary' : ''}`}
            onClick={() => setIsPlaying(!isPlaying)}
          >
            {isPlaying ? '⏸ Dừng' : '▶ Tự động'}
          </button>
          <button
            type="button"
            className="btn small-btn ghost"
            onClick={() => setCurrentStepIdx((p) => Math.min(steps.length - 1, p + 1))}
            disabled={currentStepIdx >= steps.length - 1}
            title="Tiến 1 bước"
          >
            Tiến ▶
          </button>

          <span className="step-counter-tag">
            Bước <b>{currentStepIdx + 1}</b> / {steps.length || 1}
          </span>
        </div>
      </div>

      <div className="visualizer-body-grid">
        {/* Khung Mã nguồn có chỉ báo dòng đang thực thi */}
        <div className="visualizer-code-panel">
          <div className="panel-title small muted">DÒNG MÃ ĐANG CHẠY</div>
          <div className="visualizer-code-lines">
            {codeLines.map((line, idx) => {
              const lineNum = idx + 1;
              const isCurrent = lineNum === currentStep.lineNum;
              return (
                <div key={idx} className={`vis-line-row ${isCurrent ? 'active-executing' : ''}`}>
                  <span className="vis-line-num">{lineNum}</span>
                  <span className="vis-line-indicator">{isCurrent ? '👉' : '  '}</span>
                  <code className="vis-line-text">{line || ' '}</code>
                </div>
              );
            })}
          </div>
        </div>

        {/* Khung Trực quan hóa Biến số & Call Stack */}
        <div className="visualizer-memory-panel">
          {/* Ngăn xếp hàm Call Stack */}
          <div className="memory-section">
            <div className="panel-title small muted">CALL STACK (NGĂN XẾP HÀM)</div>
            <div className="call-stack-box">
              {currentStep.callStack.map((frame, idx) => (
                <div key={idx} className="stack-frame-item">
                  <span className="frame-icon">📦</span>
                  <b>{frame}</b>
                  <span className="small muted"> (Dòng {currentStep.lineNum})</span>
                </div>
              ))}
            </div>
          </div>

          {/* Vùng Biến số Variables Scope */}
          <div className="memory-section" style={{ marginTop: '0.8rem' }}>
            <div className="panel-title small muted">BIẾN SỐ TRONG PHẠM VI (VARIABLES)</div>
            <div className="variables-table-wrap">
              {Object.keys(currentStep.variables).length === 0 ? (
                <div className="small muted empty-vars-text">Chưa có biến số nào được khai báo ở bước này</div>
              ) : (
                <div className="variables-grid">
                  {Object.entries(currentStep.variables).map(([name, info]) => (
                    <div key={name} className="variable-card">
                      <div className="var-header between">
                        <span className="var-name"><b>{name}</b></span>
                        <span className="var-type small">{info.type}</span>
                      </div>
                      <div className="var-value">
                        <code>{String(info.val)}</code>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Dòng xuất Output nếu có */}
          {currentStep.stdout && (
            <div className="memory-section" style={{ marginTop: '0.8rem' }}>
              <div className="panel-title small muted">DÒNG XUẤT TIẾP THEO (STDOUT)</div>
              <div className="vis-stdout-box">
                <code>{currentStep.stdout}</code>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
