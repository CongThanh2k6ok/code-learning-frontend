import { useState } from 'react';
import Editor from '@monaco-editor/react';

export default function CodeEditor({
  value,
  onChange,
  language = 'python',
  readOnly = false,
  height = '340px',
  onRun = null,
  title = null,
}) {
  const [fontSize, setFontSize] = useState(14);
  const [theme, setTheme] = useState('vs-dark');
  const [copied, setCopied] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(value || '');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleKeyDown = (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
      e.preventDefault();
      onRun?.();
    }
  };

  return (
    <div className={`editor-container ${isFullscreen ? 'editor-fullscreen' : ''}`} onKeyDown={handleKeyDown}>
      <div className="editor-toolbar">
        <div className="editor-info">
          <span className="lang-tag">
            <span className="lang-dot"></span>
            {language.toUpperCase()}
          </span>
          {title && <span className="editor-title-text">{title}</span>}
          {onRun && <span className="kbd-shortcut">Ctrl + Enter để chạy</span>}
        </div>

        <div className="editor-controls">
          <button
            type="button"
            className="ctrl-btn"
            title="Giảm cỡ chữ"
            onClick={() => setFontSize((s) => Math.max(12, s - 1))}
          >
            A-
          </button>
          <span className="font-size-indicator">{fontSize}px</span>
          <button
            type="button"
            className="ctrl-btn"
            title="Tăng cỡ chữ"
            onClick={() => setFontSize((s) => Math.min(20, s + 1))}
          >
            A+
          </button>

          <button
            type="button"
            className="ctrl-btn"
            title="Chuyển giao diện sáng/tối"
            onClick={() => setTheme((t) => (t === 'vs-dark' ? 'light' : 'vs-dark'))}
          >
            {theme === 'vs-dark' ? '🌙 Tối' : '☀️ Sáng'}
          </button>

          <button type="button" className="ctrl-btn" title="Sao chép toàn bộ mã" onClick={handleCopy}>
            {copied ? '✓ Đã chép' : '📋 Chép mã'}
          </button>

          <button
            type="button"
            className="ctrl-btn"
            title="Toàn màn hình"
            onClick={() => setIsFullscreen((f) => !f)}
          >
            {isFullscreen ? '✕ Thu nhỏ' : '⛶ Phóng to'}
          </button>
        </div>
      </div>

      <div className="editor-wrap">
        <Editor
          height={isFullscreen ? 'calc(100vh - 50px)' : height}
          language={language}
          theme={theme}
          value={value}
          onChange={(v) => onChange?.(v ?? '')}
          loading="Đang khởi tạo trình biên dịch Monaco..."
          options={{
            readOnly,
            minimap: { enabled: false },
            fontSize,
            fontFamily: "'Fira Code', 'Consolas', 'Courier New', monospace",
            tabSize: 4,
            insertSpaces: true,
            scrollBeyondLastLine: false,
            automaticLayout: true,
            wordWrap: 'on',
            lineNumbers: 'on',
            padding: { top: 8, bottom: 8 },
            renderLineHighlight: 'all',
          }}
        />
      </div>
    </div>
  );
}
