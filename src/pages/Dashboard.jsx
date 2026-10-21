import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { statsApi, submissionApi } from '../api/services';
import { useAuth } from '../context/AuthContext';
import ProgressBar from '../components/ProgressBar';

export default function Dashboard() {
  const { user } = useAuth();
  const [stats, setStats] = useState(null);
  const [recent, setRecent] = useState([]);

  useEffect(() => {
    statsApi.me().then(setStats);
    submissionApi.list().then((s) => setRecent(s.slice(0, 5)));
  }, []);

  if (!stats) return <div className="loading-state">Đang tải bảng điều khiển...</div>;

  const cards = [
    { label: 'Bài tập hoàn thành', value: `${stats.completed}/${stats.totalExercises}`, icon: '🎯' },
    { label: 'Bài học đã chinh phục', value: `${stats.completedLessons || 0}/${stats.totalLessons || 0}`, icon: '📚' },
    { label: 'Điểm kinh nghiệm (XP)', value: `${stats.user?.xp || 280} XP`, icon: '⚡' },
    { label: 'Chuỗi ngày học liên tục', value: `🔥 ${stats.user?.streak || 5} ngày`, icon: '🔥' },
  ];

  return (
    <div className="dashboard-page">
      {/* Hero Banner Chào mừng & Cấp độ */}
      <div className="card hero-banner">
        <div className="between hero-content">
          <div>
            <div className="badge-group" style={{ marginBottom: '0.4rem' }}>
              <span className="badge badge-primary">{stats.user?.level || 'Lập trình viên Bạc'}</span>
              <span className="badge badge-warn">🔥 Chuỗi {stats.user?.streak || 5} ngày học liên tiếp</span>
            </div>
            <h1 className="hero-title">Xin chào, {user.name}! 👋</h1>
            <p className="hero-subtitle">
              Hôm nay là một ngày tuyệt vời để viết thêm những dòng code chất lượng. Tiếp tục giữ vững phong độ nhé!
            </p>

            <div className="quick-action-buttons">
              <Link to="/topics" className="btn btn-hero">
                🚀 Tiếp tục học bài
              </Link>
              <Link to="/playground" className="btn ghost btn-hero-ghost">
                💻 Mở Playground
              </Link>
              <Link to="/quizzes" className="btn ghost btn-hero-ghost">
                🧠 Ôn tập trắc nghiệm
              </Link>
              <Link to="/roadmap" className="btn ghost btn-hero-ghost">
                🗺️ Xem lộ trình
              </Link>
            </div>
          </div>

          <div className="hero-level-box">
            <div className="level-avatar">🎓</div>
            <div className="level-xp-text">
              <b>{stats.user?.xp || 280}</b> / 500 XP
            </div>
            <div className="small muted">Mục tiêu lên hạng Vàng</div>
            <div className="progress" style={{ marginTop: '0.5rem', width: '140px' }}>
              <div
                className="progress-fill"
                style={{ width: `${Math.min(100, Math.round(((stats.user?.xp || 280) / 500) * 100))}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      {/* 4 Thẻ thống kê */}
      <div className="grid-4 stat-cards-grid">
        {cards.map((c) => (
          <div key={c.label} className="card stat-card">
            <div className="stat-icon-wrap">{c.icon}</div>
            <div className="stat-info">
              <div className="stat-value">{c.value}</div>
              <div className="muted small">{c.label}</div>
            </div>
          </div>
        ))}
      </div>

      {/* 2 Cột: Tiến độ theo chủ đề & Lịch sử nộp bài gần đây */}
      <div className="grid-2">
        {/* Cột 1: Tiến độ các chủ đề */}
        <section className="card">
          <div className="between section-title-row">
            <h2>Tiến độ từng chủ đề</h2>
            <Link to="/topics" className="small">
              Xem tất cả →
            </Link>
          </div>

          <div className="topic-progress-list">
            {stats.byTopic.map((t) => {
              const pct = Math.round((t.done / (t.total || 1)) * 100);
              return (
                <div key={t.topicId} className="topic-prog-item">
                  <div className="between" style={{ marginBottom: '0.3rem' }}>
                    <span className="topic-name">
                      {t.icon} {t.name}
                    </span>
                    <span className="muted small">
                      {t.done}/{t.total} bài tập ({pct}%)
                    </span>
                  </div>
                  <ProgressBar value={t.done} total={t.total} />
                </div>
              );
            })}
          </div>

          <div style={{ marginTop: '1.25rem' }}>
            <Link className="btn" to="/topics">
              Tiếp tục bài tập dở dang
            </Link>
          </div>
        </section>

        {/* Cột 2: Bài nộp gần đây & Nhận xét của Mentor */}
        <section className="card">
          <div className="between section-title-row">
            <h2>Bài nộp gần đây</h2>
            <Link to="/submissions" className="small">
              Xem toàn bộ ({stats.submissions}) →
            </Link>
          </div>

          {recent.length === 0 ? (
            <div className="empty-state">
              <p className="muted">Bạn chưa có bài nộp nào. Hãy vào làm bài tập đầu tiên nhé!</p>
              <Link to="/topics" className="btn small-btn">
                Bắt đầu ngay
              </Link>
            </div>
          ) : (
            <div className="recent-submissions-list">
              {recent.map((s) => (
                <div key={s.id} className="submission-item card">
                  <div className="between">
                    <b>{s.exerciseTitle}</b>
                    <span className={`badge ${s.status === 'reviewed' ? 'badge-success' : 'badge-warn'}`}>
                      {s.status === 'reviewed' ? `✓ Đã chấm (${s.score}/10đ)` : '⏳ Chờ nhận xét'}
                    </span>
                  </div>
                  {s.feedback && (
                    <div className="feedback-preview">
                      <span className="small muted">Nhận xét của Mentor: </span>
                      <span className="small">"{s.feedback}"</span>
                    </div>
                  )}
                  <div className="muted small" style={{ marginTop: '0.3rem' }}>
                    Nộp lúc: {new Date(s.createdAt).toLocaleString('vi-VN')}
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
