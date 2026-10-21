import { useState } from 'react';
import CodeEditor from '../components/CodeEditor';
import CodeVisualizer from '../components/CodeVisualizer';
import { executeCode } from '../utils/codeRunner';
import { useSettings } from '../context/SettingsContext';

const LANGUAGE_TEMPLATES = {
  python: [
    {
      name: 'Python: Hello World',
      code: `# Chương trình Python đầu tiên
ho_ten = "Bạn"
print(f"Chào mừng {ho_ten} đến với Sân chơi CodeLearn!")
print("Hãy thử nghiệm mọi ý tưởng lập trình của bạn tại đây.")
`,
    },
    {
      name: 'Python: Dãy Fibonacci',
      code: `# Sinh dãy số Fibonacci
def fibonacci(n):
    fib = [0, 1]
    for i in range(2, n):
        fib.append(fib[-1] + fib[-2])
    return fib

print("10 số đầu tiên của dãy Fibonacci:")
print(fibonacci(10))
`,
    },
    {
      name: 'Python: List Comprehension',
      code: `# Lọc và tính bình phương số chẵn
numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
even_squares = [x**2 for x in numbers if x % 2 == 0]
print("Các số chẵn bình phương:", even_squares)
`,
    },
  ],
  javascript: [
    {
      name: 'JavaScript: ES6+ Cơ bản',
      code: `// Viết JavaScript hiện đại ES6+
const student = {
  name: "Minh Anh",
  courses: ["JavaScript", "Python", "React"],
  gpa: 3.8
};

console.log("Thông tin học viên:", student.name);
console.log("Danh sách khóa học:", student.courses.join(", "));
console.log("Học lực Xuất sắc:", student.gpa >= 3.6);
`,
    },
    {
      name: 'JavaScript: Mảng & Map/Filter',
      code: `// Xử lý danh sách sản phẩm bằng filter & map
const products = [
  { name: "Bàn phím cơ", price: 120 },
  { name: "Chuột không dây", price: 45 },
  { name: "Màn hình 4K", price: 450 },
  { name: "Tai nghe gaming", price: 85 }
];

const affordable = products
  .filter(p => p.price <= 100)
  .map(p => \`\${p.name}: \${p.price} USD\`);

console.log("Sản phẩm giá tốt (<= 100 USD):");
affordable.forEach(item => console.log("•", item));
`,
    },
    {
      name: 'JavaScript: Async & Promise',
      code: `// Bất đồng bộ trong JavaScript
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

console.log("Đang bắt đầu tác vụ...");
const start = performance.now();
for (let i = 1; i <= 3; i++) {
  console.log(\`Bước \${i} hoàn tất\`);
}
console.log("Thời gian thực thi:", Math.round(performance.now() - start), "ms");
`,
    },
  ],
  html: [
    {
      name: 'HTML/CSS: Card Sản Phẩm Hiện Đại',
      code: `<!DOCTYPE html>
<html>
<head>
  <style>
    body {
      font-family: 'Segoe UI', system-ui, sans-serif;
      background: linear-gradient(135deg, #0f172a, #1e1b4b);
      color: #fff;
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 100vh;
      margin: 0;
    }
    .card {
      background: rgba(255, 255, 255, 0.08);
      backdrop-filter: blur(16px);
      border: 1px solid rgba(255, 255, 255, 0.15);
      border-radius: 16px;
      padding: 24px;
      width: 320px;
      text-align: center;
      box-shadow: 0 10px 30px rgba(0,0,0,0.4);
    }
    h2 { color: #38bdf8; margin-top: 0; }
    p { color: #cbd5e1; font-size: 14px; }
    .badge {
      background: #4f46e5;
      padding: 4px 12px;
      border-radius: 99px;
      font-size: 12px;
      font-weight: bold;
    }
    button {
      background: linear-gradient(90deg, #06b6d4, #3b82f6);
      color: #fff;
      border: none;
      padding: 10px 20px;
      border-radius: 8px;
      font-weight: bold;
      cursor: pointer;
      margin-top: 14px;
      transition: transform 0.2s;
    }
    button:hover { transform: scale(1.05); }
  </style>
</head>
<body>
  <div class="card">
    <span class="badge">🔥 Bán chạy</span>
    <h2>Khóa Học Fullstack</h2>
    <p>Làm chủ Python, JavaScript, React và cơ sở dữ liệu từ số 0.</p>
    <button onclick="alert('Đã thêm vào giỏ hàng!')">Đăng Ký Ngay</button>
  </div>
</body>
</html>
`,
    },
  ],
  cpp: [
    {
      name: 'C++: Hello & Cú pháp cơ bản',
      code: `#include <iostream>
using namespace std;

int main() {
    cout << "Xin chao cac lap trinh vien C++!" << endl;
    
    int a = 25;
    int b = 15;
    int tong = a + b;
    
    cout << "Tong cua " << a << " va " << b << " la: " << tong << endl;
    return 0;
}
`,
    },
  ],
  java: [
    {
      name: 'Java: Lớp Main & OOP',
      code: `public class Main {
    public static void main(String[] args) {
        System.out.println("Xin chao ngon ngu lap trinh Java!");
        
        String ten = "CodeLearn";
        int phienBan = 2026;
        
        System.out.println("Nen tang: " + ten + " v" + phienBan);
    }
}
`,
    },
  ],
  sql: [
    {
      name: 'SQL: Truy vấn SELECT & WHERE',
      code: `-- Truy vấn danh sách sinh viên có điểm GPA >= 3.5
SELECT * 
FROM students 
WHERE gpa >= 3.5 
ORDER BY gpa DESC;
`,
    },
  ],
};

const LANGUAGES = [
  { id: 'python', label: '🐍 Python 3', mode: 'python' },
  { id: 'javascript', label: '⚡ JavaScript (ES6+)', mode: 'javascript' },
  { id: 'html', label: '🌐 HTML / CSS (Live Preview)', mode: 'html' },
  { id: 'cpp', label: '⚙️ C++ (Modern C++)', mode: 'cpp' },
  { id: 'java', label: '☕ Java', mode: 'java' },
  { id: 'sql', label: '🗄️ SQL Database', mode: 'sql' },
];

export default function Playground() {
  const { currentLanguage, setCurrentLanguage, playSound } = useSettings();
  const [selectedLang, setSelectedLang] = useState(currentLanguage || 'python');
  const [selectedTemplate, setSelectedTemplate] = useState(0);

  const initialCode =
    LANGUAGE_TEMPLATES[selectedLang]?.[0]?.code || LANGUAGE_TEMPLATES.python[0].code;
  const [code, setCode] = useState(initialCode);
  const [stdin, setStdin] = useState('');
  const [output, setOutput] = useState(null);
  const [isRunning, setIsRunning] = useState(false);
  const [showVisualizer, setShowVisualizer] = useState(false);

  const handleLanguageChange = (langId) => {
    setSelectedLang(langId);
    setCurrentLanguage(langId);
    setSelectedTemplate(0);
    const tmpl = LANGUAGE_TEMPLATES[langId]?.[0]?.code || '';
    setCode(tmpl);
    setOutput(null);
  };

  const handleTemplateChange = (idx) => {
    setSelectedTemplate(idx);
    const tmpl = LANGUAGE_TEMPLATES[selectedLang]?.[idx]?.code || '';
    setCode(tmpl);
    setOutput(null);
  };

  const handleRun = async () => {
    setIsRunning(true);
    try {
      const res = await executeCode(code, selectedLang, stdin);
      setOutput(res);
      if (res.success) {
        playSound('success');
      }
    } catch (err) {
      setOutput({ success: false, stdout: '', error: err.message, durationMs: 0 });
    } finally {
      setIsRunning(false);
    }
  };

  const downloadFile = () => {
    const extMap = {
      python: 'py',
      javascript: 'js',
      html: 'html',
      cpp: 'cpp',
      java: 'java',
      sql: 'sql',
    };
    const ext = extMap[selectedLang] || 'txt';
    const blob = new Blob([code], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `codelearn_playground.${ext}`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const currentTemplates = LANGUAGE_TEMPLATES[selectedLang] || [];
  const currentLangObj = LANGUAGES.find((l) => l.id === selectedLang) || LANGUAGES[0];

  return (
    <div className="playground-page">
      <div className="between playground-header">
        <div>
          <h1>💻 Sân Chơi Lập Trình Đa Ngôn Ngữ (Playground)</h1>
          <p className="muted">
            Hỗ trợ thực thi đa ngôn ngữ trực tiếp: Python 3, JavaScript ES6+, HTML/CSS Live Preview, C++, Java và SQL.
          </p>
        </div>
        <div className="actions">
          <button
            type="button"
            className={`btn ${showVisualizer ? 'secondary' : 'ghost'}`}
            onClick={() => setShowVisualizer(!showVisualizer)}
            title="Mở trình trực quan hóa bộ nhớ và call stack từng bước"
          >
            {showVisualizer ? '✕ Đóng Visualizer' : '🔍 Trực quan hóa Bộ nhớ'}
          </button>
          <button className="btn ghost" onClick={downloadFile} title="Tải mã nguồn về máy tính">
            💾 Tải về file
          </button>
          <button className="btn btn-run" disabled={isRunning} onClick={handleRun}>
            {isRunning ? '⏳ Đang thực thi...' : '▶ Chạy mã (Ctrl + Enter)'}
          </button>
        </div>
      </div>

      {/* Thanh chọn Ngôn ngữ lập trình */}
      <div className="card lang-selector-card">
        <span className="small" style={{ fontWeight: 700, marginRight: '0.5rem' }}>
          Ngôn ngữ lập trình:
        </span>
        <div className="lang-tabs-row">
          {LANGUAGES.map((l) => (
            <button
              key={l.id}
              className={`lang-tab-btn ${selectedLang === l.id ? 'active' : ''}`}
              onClick={() => handleLanguageChange(l.id)}
            >
              {l.label}
            </button>
          ))}
        </div>
      </div>

      {/* Chọn mẫu code có sẵn theo ngôn ngữ */}
      {currentTemplates.length > 0 && (
        <div className="template-bar card">
          <span className="small" style={{ fontWeight: 600 }}>Mẫu có sẵn:</span>
          <div className="template-pills">
            {currentTemplates.map((t, idx) => (
              <button
                key={idx}
                className={`pill-btn ${selectedTemplate === idx ? 'active' : ''}`}
                onClick={() => handleTemplateChange(idx)}
              >
                {t.name}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Workspace: Split View */}
      <div className="grid-2 playground-workspace" style={{ alignItems: 'stretch' }}>
        {/* Cột trái: Trình soạn thảo Monaco */}
        <div className="playground-editor-wrap">
          <CodeEditor
            value={code}
            onChange={setCode}
            language={currentLangObj.mode}
            height="460px"
            onRun={handleRun}
            title={`playground.${selectedLang}`}
          />

          {selectedLang !== 'html' && (
            <label className="block" style={{ marginTop: '0.75rem' }}>
              <span className="small" style={{ fontWeight: 600 }}>
                Dữ liệu đầu vào tiêu chuẩn (Standard Input):
              </span>
              <textarea
                rows={2}
                value={stdin}
                onChange={(e) => setStdin(e.target.value)}
                placeholder="Nhập dữ liệu cho hàm input() nếu có..."
                style={{ fontFamily: 'monospace', fontSize: '0.85rem' }}
              />
            </label>
          )}
        </div>

        {/* Cột phải: Terminal Output HOẶC Live Web Preview cho HTML */}
        <div className="playground-output-wrap card">
          {selectedLang === 'html' ? (
            /* Live Preview HTML/CSS */
            <div className="html-preview-container">
              <div className="output-panel-header between">
                <span style={{ fontWeight: 600 }}>🌐 Xem trước Web thời gian thực (Live Preview)</span>
                <span className="badge badge-success">✓ Đang cập nhật</span>
              </div>
              <iframe
                title="HTML Preview"
                srcDoc={code}
                className="html-live-iframe"
                sandbox="allow-scripts"
              />
            </div>
          ) : (
            /* Terminal Console cho Python, JS, C++, SQL, Java */
            <div>
              <div className="output-panel-header between">
                <span style={{ fontWeight: 600 }}>
                  🖥️ Kết quả đầu ra ({selectedLang.toUpperCase()} Console)
                </span>
                {output && (
                  <div className="actions" style={{ margin: 0 }}>
                    <span className="exec-time">{output.durationMs}ms</span>
                    <button
                      className="btn ghost small-btn"
                      onClick={() => setOutput(null)}
                    >
                      Xóa màn hình
                    </button>
                  </div>
                )}
              </div>

              <div className="output-panel-body" style={{ minHeight: '380px' }}>
                {output ? (
                  <div className="console-view">
                    {output.stdout && <pre className="terminal-stdout">{output.stdout}</pre>}
                    {output.error && <pre className="terminal-stderr">{output.error}</pre>}
                    {!output.stdout && !output.error && (
                      <div className="muted small">Chương trình kết thúc thành công (không có output).</div>
                    )}
                  </div>
                ) : (
                  <div className="terminal-placeholder" style={{ paddingTop: '5rem' }}>
                    <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🚀</div>
                    Nhấn <b>"Chạy mã"</b> (hoặc phím tắt <code>Ctrl + Enter</code>) để thực thi chương trình của bạn.
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Trình trực quan hóa bộ nhớ từng bước */}
      {showVisualizer && (
        <div style={{ marginTop: '1.5rem' }}>
          <CodeVisualizer code={code} language={selectedLang} />
        </div>
      )}
    </div>
  );
}
