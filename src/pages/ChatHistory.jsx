import { useEffect, useMemo, useState } from 'react';
import { chatApi } from '../api/services';
import { RichText } from '../components/ChatbotPanel';

export default function ChatHistory() {
  const [chats, setChats] = useState(null);

  useEffect(() => { chatApi.all().then(setChats); }, []);

  const groups = useMemo(() => {
    const map = new Map();
    (chats || []).forEach((c) => {
      const key = c.contextKey || 'khac';
      if (!map.has(key)) map.set(key, { label: c.contextLabel || 'Trao đổi chung', items: [] });
      map.get(key).items.push(c);
    });
    return [...map.values()];
  }, [chats]);

  if (!chats) return <p className="muted">Đang tải...</p>;

  return (
    <>
      <h1>Lịch sử trao đổi</h1>
      {groups.length === 0 && <p className="muted">Chưa có cuộc trao đổi nào.</p>}
      {groups.map((g) => (
        <details key={g.label} className="card">
          <summary><b>{g.label}</b> <span className="muted small">({g.items.length} tin nhắn)</span></summary>
          {g.items.map((m) => (
            <div key={m.id} className={`bubble ${m.role}`}><RichText text={m.content} /></div>
          ))}
        </details>
      ))}
    </>
  );
}
