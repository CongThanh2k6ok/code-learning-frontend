import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { topicApi, lessonApi, exerciseApi } from '../api/services';
import { useSettings } from '../context/SettingsContext';

const LANG_FILTERS = [
  { id: 'all', label: 'Tất cả ngôn ngữ' },
  { id: 'python', label: '🐍 Python' },
  { id: 'javascript', label: '⚡ JavaScript' },
  { id: 'html', label: '🌐 HTML / CSS' },
  { id: 'cpp', label: '⚙️ C++' },
  { id: 'sql', label: '🗄️ SQL' },
];

export default function Topics() {
  const { currentLanguage, setCurrentLanguage, playSound } = useSettings();
  const [topics, setTopics] = useState([]);
  const [active, setActive] = useState(null);
  const [selectedLang, setSelectedLang] = useState('all');
  const [lessons, setLessons] = useState([]);
  const [exercises, setExercises] = useState([]);
  const [search, setSearch] = useState('');
  const [difficultyFilter, setDifficultyFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  useEffect(() => {
    topicApi.list().then((t) => {
      setTopics(t);
      if (t[0]) setActive(t[0].id);
    });
  }, []);

  const visibleTopics = topics.filter((t) => {
    if (selectedLang === 'all') return true;
    return t.language === selectedLang;
  });

  useEffect(() => {
    if (!active && visibleTopics[0]) {
      setActive(visibleTopics[0].id);
    } else if (active && !visibleTopics.some((t) => t.id === active)) {
      if (visibleTopics[0]) setActive(visibleTopics[0].id);
    }
  }, [selectedLang, visibleTopics, active]);

  useEffect(() => {
    if (!active) return;
    lessonApi.list(active).then(setLessons);
    exerciseApi.list(active).then(setExercises);
  }, [active]);

  const activeTopic = topics.find((t) => t.id === active);

  const filteredLessons = lessons.filter((l) =>
    l.title.toLowerCase().includes(search.toLowerCase())
  );

  const filteredExercises = exercises.filter((e) => {
    const matchesSearch = e.title.toLowerCase().includes(search.toLowerCase());
    const matchesDiff = difficultyFilter === 'all' || e.difficulty === difficultyFilter;
    const matchesStatus =
      statusFilter === 'all' ||
      (statusFilter === 'done' && e.done) ||
      (statusFilter === 'pending' && !e.done);
    return matchesSearch && matchesDiff && matchesStatus;
  });

  const completedExercisesCount = exercises.filter((e) => e.done).length;
  const completedLessonsCount = lessons.filter((l) => l.completed).length;

  const handleLangFilterChange = (langId) => {
    playSound('click');
    setSelectedLang(langId);
    if (langId !== 'all') {
      setCurrentLanguage(langId);
    }
  };

  return (
    <div className="topics-page">
      <div className="between topics-header">
        <div>
          <h1>📚 Chương Trình Học Đa Ngôn Ngữ & Thực Chiến</h1>
          <p className="muted">
            Khóa học đầy đủ từ cơ bản đến nâng cao. Học mọi ngôn ngữ lập trình phổ biến nhất: Python, JavaScript, HTML/CSS, C++, SQL.
          </p>
        </div>
      </div>

      {/* Bộ lọc chọn Ngôn ngữ lập trình */}
      <div className="card lang-filter-bar">
        <span className="small" style={{ fontWeight: 700, marginRight: '0.5rem' }}>
          Ngôn ngữ:
        </span>
        <div className="lang-tabs-row">
          {LANG_FILTERS.map((l) => (
            <button
              key={l.id}
              className={`lang-tab-btn ${selectedLang === l.id ? 'active' : ''}`}
              onClick={() => handleLangFilterChange(l.id)}
            >
              {l.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tabs chọn chủ đề */}
      <div className="tabs topics-tabs" style={{ marginTop: '0.75rem' }}>
        {visibleTopics.map((t) => (
          <button
            key={t.id}
            className={`tab ${active === t.id ? 'active' : ''}`}
            onClick={() => {
              setActive(t.id);
              setSearch('');
            }}
          >
            <span style={{ marginRight: '0.4rem' }}>{t.icon}</span>
            {t.name}
          </button>
        ))}
      </div>

      {/* Thông tin chủ đề hiện tại */}
      {activeTopic && (
        <div className="card topic-banner">
          <div className="between">
            <div>
              <div className="badge-group" style={{ marginBottom: '0.4rem' }}>
                <span className="badge badge-primary">{activeTopic.level}</span>
                <span className="badge badge-neutral">Chủ đề #{activeTopic.id}</span>
                {activeTopic.language && (
                  <span className="badge badge-warn">{activeTopic.language.toUpperCase()}</span>
                )}
              </div>
              <h2 style={{ margin: '0 0 0.4rem' }}>
                {activeTopic.icon} {activeTopic.name}
              </h2>
              <p className="muted small" style={{ margin: 0 }}>
                {activeTopic.description}
              </p>
            </div>
            <div className="topic-stats-box">
              <div className="small muted">Tiến độ chủ đề:</div>
              <div className="topic-prog-percent">
                {Math.round(
                  ((completedLessonsCount + completedExercisesCount) /
                    ((lessons.length + exercises.length) || 1)) *
                    100
                )}
                %
              </div>
              <div className="small muted">
                {completedLessonsCount}/{lessons.length} bài học • {completedExercisesCount}/{exercises.length} bài tập
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Thanh tìm kiếm & bộ lọc */}
      <div className="filter-bar card">
        <div className="search-wrap">
          <span>🔍</span>
          <input
            type="text"
            placeholder="Tìm kiếm bài học hoặc bài tập trong chủ đề..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="select-filters">
          <select
            value={difficultyFilter}
            onChange={(e) => setDifficultyFilter(e.target.value)}
          >
            <option value="all">Độ khó: Tất cả</option>
            <option value="Dễ">Độ khó: Dễ</option>
            <option value="Trung bình">Độ khó: Trung bình</option>
            <option value="Khó">Độ khó: Khó</option>
          </select>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="all">Trạng thái: Tất cả</option>
            <option value="done">Đã làm xong</option>
            <option value="pending">Chưa làm</option>
          </select>
        </div>
      </div>

      {/* 2 Cột: Bài học lý thuyết & Bài tập thực hành */}
      <div className="grid-2">
        {/* Cột 1: Bài học lý thuyết */}
        <section className="card list-section">
          <div className="between section-title-row">
            <h2>📖 Bài học & Ví dụ minh họa ({filteredLessons.length})</h2>
          </div>

          {filteredLessons.length === 0 ? (
            <p className="muted" style={{ padding: '1rem' }}>
              Không có bài học nào phù hợp với tìm kiếm.
            </p>
          ) : (
            filteredLessons.map((l, idx) => (
              <Link key={l.id} to={`/lessons/${l.id}`} className="list-item between hover-item">
                <div className="list-item-left">
                  <span className="item-order">#{idx + 1}</span>
                  <div>
                    <div className="item-title">{l.title}</div>
                    {l.readTime && <span className="muted small">⏱ {l.readTime}</span>}
                  </div>
                </div>
                <div>
                  {l.completed ? (
                    <span className="badge badge-success">✓ Đã học</span>
                  ) : (
                    <span className="badge badge-neutral">Chưa học</span>
                  )}
                </div>
              </Link>
            ))
          )}
        </section>

        {/* Cột 2: Bài tập thực hành */}
        <section className="card list-section">
          <div className="between section-title-row">
            <h2>💻 Bài tập thực hành có chấm điểm ({filteredExercises.length})</h2>
          </div>

          {filteredExercises.length === 0 ? (
            <p className="muted" style={{ padding: '1rem' }}>
              Không có bài tập nào phù hợp với bộ lọc hiện tại.
            </p>
          ) : (
            filteredExercises.map((e, idx) => (
              <Link key={e.id} to={`/exercises/${e.id}`} className="list-item between hover-item">
                <div className="list-item-left">
                  <span className="item-order">#{idx + 1}</span>
                  <div>
                    <div className="item-title">{e.title}</div>
                    <span
                      className={`badge small-badge ${
                        e.difficulty === 'Dễ'
                          ? 'badge-easy'
                          : e.difficulty === 'Trung bình'
                          ? 'badge-med'
                          : 'badge-hard'
                      }`}
                    >
                      {e.difficulty}
                    </span>
                  </div>
                </div>
                <div>
                  {e.done ? (
                    <span className="badge badge-success">✓ Đã nộp</span>
                  ) : (
                    <span className="badge badge-primary">Làm bài →</span>
                  )}
                </div>
              </Link>
            ))
          )}
        </section>
      </div>
    </div>
  );
}
