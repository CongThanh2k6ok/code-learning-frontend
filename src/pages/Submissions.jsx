import { useEffect, useState } from 'react';
import { submissionApi } from '../api/services';

export default function Submissions() {
  const [list, setList] = useState(null);

  useEffect(() => { submissionApi.list().then(setList); }, []);

  if (!list) return <p className="muted">Đang tải...</p>;

  return (
    <>
      <h1>Bài đã nộp</h1>
      {list.length === 0 && <p className="muted">Bạn chưa nộp bài nào.</p>}
      {list.map((s) => (
        <details key={s.id} className="card">
          <summary className="between">
            <span><b>{s.exerciseTitle}</b> <span className="muted small">{new Date(s.createdAt).toLocaleString('vi-VN')}</span></span>
            <span className={`badge ${s.status === 'reviewed' ? 'ok' : 'warn'}`}>
              {s.status === 'reviewed' ? `Đã nhận xét${s.score != null ? ` · ${s.score}đ` : ''}` : 'Chờ nhận xét'}
            </span>
          </summary>
          <pre className="code-block">{s.code}</pre>
          {s.feedback && <div className="alert info"><b>Nhận xét:</b> {s.feedback}</div>}
        </details>
      ))}
    </>
  );
}
