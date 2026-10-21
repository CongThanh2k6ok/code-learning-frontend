import { useEffect, useState } from 'react';
import { topicApi, lessonApi, exerciseApi } from '../api/services';

const emptyLesson = { topicId: '', title: '', content: '', example: '' };
const emptyExercise = { topicId: '', title: '', difficulty: 'Dễ', description: '', starterCode: '', hints: '', solution: '' };

export default function Manage() {
  const [tab, setTab] = useState('lessons');
  const [topics, setTopics] = useState([]);
  const [items, setItems] = useState([]);
  const [form, setForm] = useState(emptyLesson);

  const api = tab === 'lessons' ? lessonApi : exerciseApi;
  const reload = () => api.list().then(setItems);

  useEffect(() => { topicApi.list().then(setTopics); }, []);
  useEffect(() => {
    setForm(tab === 'lessons' ? emptyLesson : emptyExercise);
    api.list().then(setItems);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tab]);

  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  async function submit(e) {
    e.preventDefault();
    await api.create(form);
    setForm(tab === 'lessons' ? emptyLesson : emptyExercise);
    reload();
  }

  async function remove(id) {
    if (!window.confirm('Xóa mục này?')) return;
    await api.remove(id);
    reload();
  }

  return (
    <>
      <h1>Quản lý nội dung</h1>
      <div className="tabs">
        <button className={`tab ${tab === 'lessons' ? 'active' : ''}`} onClick={() => setTab('lessons')}>Bài học & ví dụ</button>
        <button className={`tab ${tab === 'exercises' ? 'active' : ''}`} onClick={() => setTab('exercises')}>Bài tập</button>
      </div>

      <div className="grid-2">
        <form className="card" onSubmit={submit}>
          <h2>Thêm {tab === 'lessons' ? 'bài học' : 'bài tập'}</h2>
          <label>Chủ đề
            <select required value={form.topicId} onChange={set('topicId')}>
              <option value="">-- Chọn chủ đề --</option>
              {topics.map((t) => <option key={t.id} value={t.id}>{t.name}</option>)}
            </select>
          </label>
          <label>Tiêu đề<input required value={form.title} onChange={set('title')} /></label>

          {tab === 'lessons' ? (
            <>
              <label>Nội dung<textarea rows={4} required value={form.content} onChange={set('content')} /></label>
              <label>Mã ví dụ<textarea rows={4} value={form.example} onChange={set('example')} /></label>
            </>
          ) : (
            <>
              <label>Độ khó
                <select value={form.difficulty} onChange={set('difficulty')}>
                  <option>Dễ</option><option>Trung bình</option><option>Khó</option>
                </select>
              </label>
              <label>Đề bài<textarea rows={3} required value={form.description} onChange={set('description')} /></label>
              <label>Mã khởi tạo<textarea rows={3} value={form.starterCode} onChange={set('starterCode')} /></label>
              <label>Gợi ý (mỗi dòng một gợi ý)<textarea rows={3} value={form.hints} onChange={set('hints')} /></label>
              <label>Lời giải<textarea rows={3} value={form.solution} onChange={set('solution')} /></label>
            </>
          )}
          <button className="btn">Thêm</button>
        </form>

        <section className="card">
          <h2>Danh sách ({items.length})</h2>
          {items.map((it) => (
            <div key={it.id} className="between list-item">
              <span>{it.title} <span className="muted small">· {topics.find((t) => t.id === it.topicId)?.name}</span></span>
              <button className="btn danger small-btn" onClick={() => remove(it.id)}>Xóa</button>
            </div>
          ))}
        </section>
      </div>
    </>
  );
}
