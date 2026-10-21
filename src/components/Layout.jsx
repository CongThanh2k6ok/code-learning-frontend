import { NavLink, Outlet, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useSettings } from '../context/SettingsContext';
import { USE_MOCK } from '../api/services';
import UserAvatar from './UserAvatar';
import LofiLounge from './LofiLounge';

export default function Layout() {
  const { user, logout } = useAuth();
  const { theme, setTheme, currentLanguage, setCurrentLanguage, playSound } = useSettings();
  const navigate = useNavigate();
  const isMentor = user?.role === 'mentor';

  const learningLinks = [
    { to: '/', label: 'Tổng quan', icon: '📊', end: true },
    { to: '/topics', label: 'Chủ đề & Bài tập', icon: '📚' },
    { to: '/roadmap', label: 'Lộ trình học tập', icon: '🗺️' },
  ];

  const toolsLinks = [
    { to: '/playground', label: 'Sân chơi Playground', icon: '💻' },
    { to: '/arena', label: 'Đấu trường Code 1v1', icon: '⚔️' },
    { to: '/quizzes', label: 'Trắc nghiệm kiến thức', icon: '🧠' },
    { to: '/cheatsheet', label: 'Sổ tay tra cứu cú pháp', icon: '📖' },
  ];

  const progressLinks = [
    { to: '/leaderboard', label: 'Bảng xếp hạng & XP', icon: '🥇' },
    { to: '/submissions', label: 'Bài đã nộp & Điểm', icon: '📝' },
    { to: '/chat-history', label: 'Lịch sử trao đổi AI', icon: '💬' },
    { to: '/profile', label: 'Hồ sơ cá nhân', icon: '👤' },
    { to: '/settings', label: 'Cài đặt hệ thống', icon: '⚙️' },
  ];

  const mentorLinks = [
    { to: '/mentor', label: 'Chấm & nhận xét bài', icon: '✍️' },
    { to: '/manage', label: 'Quản lý khóa học', icon: '⚙️' },
  ];

  const toggleTheme = () => {
    playSound('click');
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  const LANG_TAGS = [
    { id: 'python', label: '🐍 Python' },
    { id: 'javascript', label: '⚡ JS' },
    { id: 'html', label: '🌐 HTML/CSS' },
    { id: 'cpp', label: '⚙️ C++' },
    { id: 'sql', label: '🗄️ SQL' },
  ];

  const xp = user?.xp || 280;
  const streak = user?.streak || 5;

  return (
    <div className="app-shell">
      {/* Sidebar Navigation */}
      <aside className="sidebar">
        <div className="brand-wrap">
          <Link to="/" className="brand">
            <span className="brand-logo">&lt;/&gt;</span>
            <span className="brand-text">CodeLearn</span>
          </Link>
          <span className="brand-tag">PRO</span>
        </div>

        <nav className="sidebar-nav">
          <div className="nav-group-title">HỌC TẬP</div>
          {learningLinks.map((item) => (
            <NavLink key={item.to} to={item.to} end={item.end} className="nav-item">
              <span className="nav-icon">{item.icon}</span>
              <span className="nav-label">{item.label}</span>
            </NavLink>
          ))}

          <div className="nav-group-title">CÔNG CỤ & ĐẤU TRƯỜNG</div>
          {toolsLinks.map((item) => (
            <NavLink key={item.to} to={item.to} className={`nav-item ${item.to === '/arena' ? 'nav-item-arena' : ''}`}>
              <span className="nav-icon">{item.icon}</span>
              <span className="nav-label">{item.label}</span>
              {item.to === '/arena' && <span className="nav-badge-hot">HOT</span>}
            </NavLink>
          ))}

          <div className="nav-group-title">TIẾN ĐỘ & CÁ NHÂN</div>
          {progressLinks.map((item) => (
            <NavLink key={item.to} to={item.to} className="nav-item">
              <span className="nav-icon">{item.icon}</span>
              <span className="nav-label">{item.label}</span>
            </NavLink>
          ))}

          {isMentor && (
            <>
              <div className="nav-group-title mentor-title">DÀNH CHO MENTOR</div>
              {mentorLinks.map((item) => (
                <NavLink key={item.to} to={item.to} className="nav-item mentor-item">
                  <span className="nav-icon">{item.icon}</span>
                  <span className="nav-label">{item.label}</span>
                </NavLink>
              ))}
            </>
          )}
        </nav>

        <div className="sidebar-foot">
          {/* Nút bật tắt giao diện Sáng / Tối nhanh */}
          <button type="button" className="btn-quick-theme" onClick={toggleTheme}>
            <span>{theme === 'dark' ? '🌙 Chế độ Tối' : '☀️ Chế độ Sáng'}</span>
            <span className="theme-switch-indicator">Đổi ⇄</span>
          </button>

          <Link to="/profile" className="user-mini-card">
            <UserAvatar user={user} size="sm" showStatus={true} status="online" />
            <div className="user-text-info">
              <div className="user-name-line">{user?.name}</div>
              <div className="user-role-line">
                {isMentor ? 'Người hướng dẫn' : (user?.title ? user.title.slice(0, 18) + '...' : 'Sinh viên')}
              </div>
            </div>
          </Link>

          {USE_MOCK && (
            <div className="mock-badge">
              <span className="dot-pulse"></span> Chế độ dữ liệu Mock
            </div>
          )}

          <button
            className="btn ghost logout-btn"
            onClick={() => {
              logout();
              navigate('/login');
            }}
          >
            Đăng xuất ➔
          </button>
        </div>
      </aside>

      {/* Main Container với Top Header Bar */}
      <div className="main-layout-wrap">
        <header className="top-header between">
          <div className="header-left">
            <span className="header-lang-label small muted">Ngôn ngữ:</span>
            <div className="header-lang-pills">
              {LANG_TAGS.map((lang) => (
                <button
                  key={lang.id}
                  className={`lang-pill ${currentLanguage === lang.id ? 'active' : ''}`}
                  onClick={() => {
                    playSound('click');
                    setCurrentLanguage(lang.id);
                  }}
                >
                  {lang.label}
                </button>
              ))}
            </div>
          </div>

          <div className="header-right">
            <Link to="/arena" className="arena-header-pill" title="Tham gia Đấu trường Code 1v1">
              ⚔️ <b>Đấu trường PK</b>
            </Link>

            <div className="streak-pill" title="Chuỗi ngày học liên tục của bạn">
              🔥 <b>{streak}</b> ngày
            </div>

            <div className="xp-pill" title="Điểm kinh nghiệm tích lũy">
              ⚡ <b>{xp}</b> XP
            </div>

            <button
              type="button"
              className="header-icon-btn"
              onClick={toggleTheme}
              title={`Chuyển sang chế độ ${theme === 'dark' ? 'Sáng' : 'Tối'}`}
            >
              {theme === 'dark' ? '🌙' : '☀️'}
            </button>

            <Link
              to="/settings"
              className="header-icon-btn"
              title="Cài đặt hệ thống, âm thanh, nhắc nhở"
            >
              ⚙️
            </Link>

            <Link to="/profile" className="header-profile-link">
              <UserAvatar user={user} size="xs" showStatus={true} status="online" />
              <span className="header-user-name">{user?.name}</span>
            </Link>
          </div>
        </header>

        <main className="content">
          <Outlet />
        </main>
      </div>

      {/* Widget Âm thanh Lofi & Tập trung nổi */}
      <LofiLounge />
    </div>
  );
}
