import { useEffect, useRef, useState } from 'react';
import { chatApi } from '../api/services';

// Thành phần hiển thị khối mã có nút sao chép và chèn vào trình soạn thảo
function CodeSnippet({ code, language = 'python', onInsert }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="chat-code-snippet">
      <div className="chat-code-header between">
        <span className="chat-code-lang">{language.toUpperCase()}</span>
        <div className="actions" style={{ margin: 0 }}>
          <button type="button" className="chat-code-btn" onClick={handleCopy}>
            {copied ? '✓ Đã chép' : '📋 Chép mã'}
          </button>
          {onInsert && (
            <button
              type="button"
              className="chat-code-btn btn-insert"
              onClick={() => onInsert(code)}
              title="Chèn trực tiếp mã này vào trình soạn thảo của bạn"
            >
              📥 Chèn vào Editor
            </button>
          )}
        </div>
      </div>
      <pre className="code-block chat-code-body">{code}</pre>
    </div>
  );
}

// Wrapper tương thích ngược cho ChatHistory
export const RichText = ({ text }) => <RichMarkdownMessage content={text} />;

// Trình hiển thị Markdown trực quan cho Chatbot
export function RichMarkdownMessage({ content, onInsertCode }) {
  if (!content) return null;

  // Tách nội dung theo khối mã ```lang ... ```
  const parts = content.split(/```(\w*)\n([\s\S]*?)```/g);

  if (parts.length === 1) {
    return (
      <div className="chat-rich-text">
        {content.split('\n').map((line, i) => {
          if (line.startsWith('### ')) {
            return <h4 key={i} className="chat-h4">{line.replace('### ', '')}</h4>;
          }
          if (line.startsWith('- ') || line.startsWith('* ')) {
            return (
              <li key={i} className="chat-li">
                {renderInlineFormatted(line.slice(2))}
              </li>
            );
          }
          return (
            <p key={i} className="chat-p">
              {renderInlineFormatted(line)}
            </p>
          );
        })}
      </div>
    );
  }

  const elements = [];
  for (let i = 0; i < parts.length; i += 3) {
    const textBefore = parts[i];
    const lang = parts[i + 1] || 'python';
    const code = parts[i + 2];

    if (textBefore) {
      elements.push(
        <div key={`text-${i}`} className="chat-rich-text">
          {textBefore.split('\n').map((line, lIdx) => {
            if (line.startsWith('### ')) {
              return <h4 key={lIdx} className="chat-h4">{line.replace('### ', '')}</h4>;
            }
            if (line.startsWith('- ') || line.startsWith('* ')) {
              return (
                <li key={lIdx} className="chat-li">
                  {renderInlineFormatted(line.slice(2))}
                </li>
              );
            }
            return (
              <p key={lIdx} className="chat-p">
                {renderInlineFormatted(line)}
              </p>
            );
          })}
        </div>
      );
    }

    if (code !== undefined) {
      elements.push(
        <CodeSnippet
          key={`code-${i}`}
          code={code.trim()}
          language={lang}
          onInsert={onInsertCode}
        />
      );
    }
  }

  return <>{elements}</>;
}

// Hỗ trợ định dạng inline code `...` và in đậm **...**
function renderInlineFormatted(str) {
  if (!str) return '';
  const inlineParts = str.split(/(`[^`]+`|\*\*[^*]+\*\*)/g);
  return inlineParts.map((part, idx) => {
    if (part.startsWith('`') && part.endsWith('`')) {
      return <code key={idx} className="chat-inline-code">{part.slice(1, -1)}</code>;
    }
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={idx}>{part.slice(2, -2)}</strong>;
    }
    return part;
  });
}

const QUICK_ACTIONS = [
  ['explain', '🔍 Giải thích mã', 'Hãy giải thích chi tiết logic từng dòng của đoạn mã này.'],
  ['error', '🐞 Sửa lỗi cú pháp', 'Phân tích thông báo lỗi và viết lại mã nguồn chính xác giúp mình.'],
  ['bigo', '⚡ Phân tích Big-O', 'Hãy phân tích độ phức tạp thời gian O(N), không gian O(N) và đánh giá độ sạch (Clean Code) của đoạn mã này.'],
  ['hint', '💡 Gợi ý tư duy', 'Cho mình gợi ý phương pháp giải bước tiếp theo (không đưa ngay đáp án).'],
  ['optimize', '🚀 Tối ưu hiệu năng', 'Hãy tối ưu đoạn mã này ngắn gọn, chuẩn PEP 8 và chạy nhanh hơn.'],
  ['convert', '🌐 Sang JavaScript', 'Hãy chuyển đổi đoạn mã Python này sang cú pháp JavaScript tương đương.'],
];

export default function ChatbotPanel({
  contextKey,
  contextLabel,
  getCode,
  getError,
  onInsertCode,
}) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [speakingIdx, setSpeakingIdx] = useState(null);
  const endRef = useRef(null);

  useEffect(() => {
    chatApi.history(contextKey).then(setMessages).catch(() => setMessages([]));
  }, [contextKey]);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  // Dừng giọng nói khi component unmount
  useEffect(() => {
    return () => {
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  // Đọc to nội dung bằng Web Speech API
  const handleSpeak = (text, idx) => {
    if (!window.speechSynthesis) return;

    if (speakingIdx === idx) {
      window.speechSynthesis.cancel();
      setSpeakingIdx(null);
      return;
    }

    window.speechSynthesis.cancel();

    // Loại bỏ khối code khi đọc để nghe êm tai
    const cleanText = text.replace(/```[\s\S]*?```/g, ' [Khối mã nguồn] ').replace(/[`*#]/g, '');
    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.lang = 'vi-VN';
    utterance.rate = 1.05;

    // Tìm giọng tiếng Việt nếu có
    const voices = window.speechSynthesis.getVoices();
    const viVoice = voices.find((v) => v.lang.startsWith('vi'));
    if (viVoice) utterance.voice = viVoice;

    utterance.onend = () => setSpeakingIdx(null);
    utterance.onerror = () => setSpeakingIdx(null);

    setSpeakingIdx(idx);
    window.speechSynthesis.speak(utterance);
  };

  async function send(message, mode = 'chat') {
    if (!message.trim() || loading) return;
    const now = new Date().toISOString();
    setMessages((m) => [...m, { role: 'user', content: message, createdAt: now }]);
    setInput('');
    setLoading(true);

    try {
      const reply = await chatApi.send({
        contextKey,
        contextLabel,
        message,
        mode,
        code: getCode?.() || '',
        errorText: getError?.() || '',
      });
      setMessages((m) => [...m, reply]);
    } catch (e) {
      setMessages((m) => [
        ...m,
        {
          role: 'assistant',
          content: `Có lỗi khi trao đổi với AI: ${e.message}`,
          createdAt: new Date().toISOString(),
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  const handleClearHistory = () => {
    if (window.confirm('Xóa sạch lịch sử hội thoại của bài học này?')) {
      if (window.speechSynthesis) window.speechSynthesis.cancel();
      setSpeakingIdx(null);
      setMessages([]);
    }
  };

  return (
    <div className="chat glass-chat">
      <div className="chat-head between">
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span className="bot-avatar">🤖</span>
          <div>
            <div className="bot-title">Trợ lý AI Gia sư Lập trình</div>
            <div className="bot-status small">
              <span className="dot-online"></span> Sẵn sàng giải đáp 24/7 • Giọng nói AI
            </div>
          </div>
        </div>
        {messages.length > 0 && (
          <button
            type="button"
            className="ctrl-btn"
            title="Xóa đoạn hội thoại"
            onClick={handleClearHistory}
          >
            🗑️
          </button>
        )}
      </div>

      {/* Các gợi ý phím tắt nhanh */}
      <div className="chat-quick">
        {QUICK_ACTIONS.map(([mode, label, text]) => (
          <button
            key={mode}
            className="chip"
            disabled={loading}
            onClick={() => send(text, mode)}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Thân hiển thị tin nhắn */}
      <div className="chat-body">
        {messages.length === 0 && (
          <div className="chat-empty-state">
            <div className="empty-bot-icon">💬</div>
            <b>Hỏi bất kỳ điều gì về đoạn mã của bạn!</b>
            <p className="small muted">
              Bạn có thể nhờ AI giải thích từng dòng lệnh, tìm và sửa lỗi cú pháp, đọc to câu trả lời, phân tích độ phức tạp Big-O hoặc viết lại bằng ngôn ngữ khác.
            </p>
          </div>
        )}

        {messages.map((m, i) => (
          <div key={m.id ?? i} className={`bubble ${m.role}`}>
            <div className="bubble-header between">
              <span className="bubble-sender">{m.role === 'user' ? 'Bạn' : '🤖 Trợ lý AI'}</span>
              <div className="row-center gap-1">
                {m.role === 'assistant' && (
                  <button
                    type="button"
                    className={`btn-tts-speak ${speakingIdx === i ? 'speaking' : ''}`}
                    onClick={() => handleSpeak(m.content, i)}
                    title={speakingIdx === i ? 'Dừng đọc' : 'Đọc to giải thích này'}
                  >
                    {speakingIdx === i ? '⏹️ Dừng đọc' : '🔊 Đọc to'}
                  </button>
                )}
                <span className="bubble-time small muted">
                  {m.createdAt ? new Date(m.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : ''}
                </span>
              </div>
            </div>
            <RichMarkdownMessage content={m.content} onInsertCode={onInsertCode} />
          </div>
        ))}

        {loading && (
          <div className="bubble assistant typing-bubble">
            <div className="typing-dots">
              <span></span>
              <span></span>
              <span></span>
            </div>
            <span className="small muted" style={{ marginLeft: '0.4rem' }}>
              Trợ lý AI đang phân tích mã nguồn và soạn câu trả lời...
            </span>
          </div>
        )}

        <div ref={endRef} />
      </div>

      {/* Ô nhập tin nhắn */}
      <form
        className="chat-input"
        onSubmit={(e) => {
          e.preventDefault();
          send(input);
        }}
      >
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Hỏi về lỗi, Big-O, thuật toán, hoặc yêu cầu giải thích code..."
          disabled={loading}
        />
        <button className="btn btn-send" disabled={loading || !input.trim()}>
          Gửi ➤
        </button>
      </form>
    </div>
  );
}
