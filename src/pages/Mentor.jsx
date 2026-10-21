import { useEffect, useState } from 'react';
import { submissionApi } from '../api/services';

function ReviewCard({ s, onDone }) {
  const [feedback, setFeedback] = useState(s.feedback || '');
  const [score, setScore] = useState(s.score ?? '');
  const [saving, setSaving] = useState(false);

  async function save() {
    setSaving(true);
    try {
      await submissionApi.review(s.id, { feedback, score });
      onDone();
    } finally { setSaving(false); }
  }

  return (
    <details className="card">
      <summary className="between">
        <span><b>{s.exerciseTitle}</b> · {s.studentName}</span>
        <span className={`badge ${s.status === 'reviewed' ? 'ok' : 'warn'}`}>{s.status === 'reviewed' ? 'Đã nhận xét' : 'Chờ nhận xét'}</span>
      </summary>
      <pre className="code-block">{s.code}</pre>
      <label>Nhận xét<textarea rows={3} value={feedback} onChange={(e) => setFeedback(e.target.value)} /></label>
      <label>Điểm (0-10)<input type="number" min="0" max="10" step="0.5" value={score} onChange={(e) => setScore(e.target.value)} /></label>
      <button className="btn" disabled={saving} onClick={save}>Gửi nhận xét</button>
    </details>
  );
}

export default function Mentor() {
  const [list, setList] = useState(null);
  const load = () => submissionApi.list({ all: true }).then(setList);

  useEffect(() => { load(); }, []);

  if (!list) return <p className="muted">Đang tải...</p>;

  return (
    <>
      <h1>Chấm bài & nhận xét</h1>
      {list.length === 0 && <p className="muted">Chưa có bài nộp.</p>}
      {list.map((s) => <ReviewCard key={s.id} s={s} onDone={load} />)}
    </>
  );
}
