import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { statsApi, achievementApi } from '../api/services';
import { resetMock } from '../api/mockDb';
import ProgressBar from '../components/ProgressBar';
import UserAvatar from '../components/UserAvatar';
import AvatarPickerModal from '../components/AvatarPickerModal';
import ActivityHeatmap from '../components/ActivityHeatmap';

export default function Profile() {
  const { user, updateProfile } = useAuth();
  const [form, setForm] = useState({
    name: user?.name || '',
    title: user?.title || 'Lập trình viên Tập sự',
    bio: user?.bio || '',
    github: user?.github || '',
    linkedin: user?.linkedin || '',
    language: user?.language || 'Python',
    skills: user?.skills || ['Python 3', 'Thuật toán', 'JavaScript', 'HTML/CSS', 'SQL'],
  });

  const [newSkill, setNewSkill] = useState('');
  const [showAvatarModal, setShowAvatarModal] = useState(false);
  const [stats, setStats] = useState(null);
  const [achievements, setAchievements] = useState([]);
  const [msg, setMsg] = useState(null);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    statsApi.me().then(setStats);
    achievementApi.list().then(setAchievements);
  }, []);

  // Cập nhật form khi user thay đổi
  useEffect(() => {
    if (user) {
      setForm((prev) => ({
        ...prev,
        name: user.name || '',
        title: user.title || 'Lập trình viên Tập sự',
        bio: user.bio || '',
        github: user.github || '',
        linkedin: user.linkedin || '',
        language: user.language || 'Python',
        skills: user.skills || prev.skills,
      }));
    }
  }, [user]);

  async function handleAvatarSave(newAvatar) {
    try {
      await updateProfile({ avatar: newAvatar });
      setMsg({ type: 'ok', text: '✓ Đã cập nhật ảnh đại diện mới thành công!' });
      setTimeout(() => setMsg(null), 3000);
    } catch (err) {
      setMsg({ type: 'error', text: 'Lỗi cập nhật ảnh: ' + err.message });
    }
  }

  async function submit(e) {
    e.preventDefault();
    setIsSaving(true);
    try {
      await updateProfile(form);
      setMsg({ type: 'ok', text: '✓ Đã lưu thay đổi thông tin hồ sơ thành công!' });
      setTimeout(() => setMsg(null), 3500);
    } catch (err) {
      setMsg({ type: 'error', text: err.message });
    } finally {
      setIsSaving(false);
    }
  }

  const addSkill = (e) => {
    e.preventDefault();
    if (!newSkill.trim()) return;
    if (form.skills.includes(newSkill.trim())) return;
    setForm({ ...form, skills: [...form.skills, newSkill.trim()] });
    setNewSkill('');
  };

  const removeSkill = (skillToRemove) => {
    setForm({ ...form, skills: form.skills.filter((s) => s !== skillToRemove) });
  };

  function handleResetAllData() {
    if (
      window.confirm(
        'Bạn có chắc chắn muốn đặt lại toàn bộ dữ liệu về trạng thái mẫu ban đầu? Tiến độ và bài nộp sẽ được làm mới.'
      )
    ) {
      resetMock();
      window.location.reload();
    }
  }

  const isMentor = user?.role === 'mentor';
  const elo = user?.arenaElo || 1280;
  const wins = user?.arenaWins || 14;

  return (
    <div className="profile-page">
      {/* Cover Banner Siêu Sang */}
      <div className="profile-hero-banner">
        <div className="profile-banner-bg" />
        <div className="profile-hero-content between">
          <div className="profile-hero-left">
            <div className="profile-avatar-wrapper" onClick={() => setShowAvatarModal(true)}>
              <UserAvatar user={user} size="2xl" showStatus={true} status="online" />
              <button
                type="button"
                className="btn-change-avatar-badge"
                title="Thay đổi ảnh đại diện cá nhân"
              >
                📷 Đổi ảnh
              </button>
            </div>

            <div className="profile-hero-meta">
              <div className="hero-name-row">
                <h1 className="hero-name">{user?.name}</h1>
                <span className="badge badge-primary hero-badge">
                  {isMentor ? '👨‍🏫 Mentor & Chuyên Gia' : `⚡ ${stats?.user?.level || 'Lập trình viên Bạc'}`}
                </span>
                <span className="badge badge-accent hero-elo">
                  ⚔️ ELO: <b>{elo}</b>
                </span>
              </div>
              <p className="hero-title-text">{form.title}</p>
              <div className="hero-links">
                {form.github && (
                  <a href={form.github} target="_blank" rel="noreferrer" className="hero-social-link">
                    💻 GitHub
                  </a>
                )}
                {form.linkedin && (
                  <a href={form.linkedin} target="_blank" rel="noreferrer" className="hero-social-link">
                    💼 LinkedIn
                  </a>
                )}
                <span className="hero-email small muted">📧 {user?.email}</span>
              </div>
            </div>
          </div>

          <div className="profile-hero-actions">
            <button
              type="button"
              className="btn"
              onClick={() => setShowAvatarModal(true)}
            >
              🎨 Tùy chỉnh Avatar
            </button>
            <button
              type="button"
              className="btn ghost danger-ghost small-btn"
              onClick={handleResetAllData}
            >
              🔄 Đặt lại dữ liệu gốc
            </button>
          </div>
        </div>
      </div>

      {msg && <div className={`alert ${msg.type}`} style={{ marginBottom: '1.25rem' }}>{msg.text}</div>}

      {/* Biểu đồ hoạt động kiểu GitHub (Heatmap) */}
      <div style={{ marginBottom: '1.5rem' }}>
        <ActivityHeatmap streak={user?.streak || 5} totalContributions={240} />
      </div>

      <div className="grid-2 profile-main-grid">
        {/* Cột Trái: Chỉnh sửa thông tin hồ sơ */}
        <form className="card profile-form" onSubmit={submit}>
          <div className="between form-head">
            <h2 style={{ margin: 0 }}>📝 Thiết lập thông tin cá nhân</h2>
            <span className="small muted">Chỉnh sửa và lưu tức thì</span>
          </div>

          <label>
            Họ và tên hiển thị
            <input
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="Nhập họ và tên..."
            />
          </label>

          <label>
            Chức danh / Định hướng nghề nghiệp
            <input
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              placeholder="VD: Full-stack Python Developer, AI Researcher..."
            />
          </label>

          <label>
            Giới thiệu bản thân & Mục tiêu lập trình
            <textarea
              rows={3}
              value={form.bio}
              onChange={(e) => setForm({ ...form, bio: e.target.value })}
              placeholder="Chia sẻ đam mê công nghệ và định hướng học tập của bạn..."
            />
          </label>

          <div className="grid-2" style={{ gap: '0.75rem' }}>
            <label>
              Liên kết GitHub Profile
              <input
                value={form.github}
                onChange={(e) => setForm({ ...form, github: e.target.value })}
                placeholder="https://github.com/username"
              />
            </label>
            <label>
              Liên kết LinkedIn
              <input
                value={form.linkedin}
                onChange={(e) => setForm({ ...form, linkedin: e.target.value })}
                placeholder="https://linkedin.com/in/username"
              />
            </label>
          </div>

          <label>
            Ngôn ngữ lập trình chính yếu
            <select
              value={form.language}
              onChange={(e) => setForm({ ...form, language: e.target.value })}
            >
              <option value="Python">🐍 Python 3</option>
              <option value="JavaScript">⚡ JavaScript (ES6+)</option>
              <option value="HTML/CSS">🌐 HTML5 & CSS3</option>
              <option value="C++">⚙️ C++ Standard</option>
              <option value="SQL">🗄️ SQL Database</option>
            </select>
          </label>

          {/* Quản lý danh sách Kỹ năng Tags */}
          <div className="skills-manage-section">
            <label>Kỹ năng & Công nghệ thành thạo</label>
            <div className="skills-tags-wrap">
              {form.skills.map((skill) => (
                <span key={skill} className="skill-chip">
                  {skill}
                  <button
                    type="button"
                    className="skill-remove-btn"
                    onClick={() => removeSkill(skill)}
                    title="Xóa kỹ năng"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>

            <div className="add-skill-row">
              <input
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                placeholder="Thêm kỹ năng mới (VD: Docker, PyTorch, React)..."
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    addSkill(e);
                  }
                }}
              />
              <button type="button" className="btn secondary small-btn" onClick={addSkill}>
                + Thêm
              </button>
            </div>
          </div>

          <button className="btn" type="submit" disabled={isSaving} style={{ marginTop: '0.75rem' }}>
            {isSaving ? 'Đang lưu...' : '💾 Lưu mọi thay đổi hồ sơ'}
          </button>
        </form>

        {/* Cột Phải: Thống kê & Thành tựu */}
        <div className="profile-stats-col">
          {/* Card Đấu trường & Chiến tích */}
          <div className="card arena-summary-card">
            <div className="between">
              <h3>⚔️ Đấu Trường Lập Trình (Arena)</h3>
              <span className="badge badge-accent">Rank ELO</span>
            </div>
            <div className="arena-stats-row">
              <div className="arena-stat-item">
                <div className="stat-num glow-gold">{elo}</div>
                <div className="stat-desc">Điểm ELO Hiện Tại</div>
              </div>
              <div className="arena-stat-item">
                <div className="stat-num glow-green">{wins}</div>
                <div className="stat-desc">Trận Thắng 1v1</div>
              </div>
              <div className="arena-stat-item">
                <div className="stat-num glow-purple">88.5%</div>
                <div className="stat-desc">Tỷ Lệ Thắng</div>
              </div>
            </div>
          </div>

          {/* Card Tiến độ học tập & Thống kê */}
          <section className="card profile-stats-card">
            <div className="between">
              <h2>📊 Chỉ số học tập chi tiết</h2>
              <span className="small muted">Hệ thống tính điểm tự động</span>
            </div>

            {!stats ? (
              <p className="muted">Đang tải thống kê...</p>
            ) : (
              <div className="profile-stats-body">
                <div className="stat-highlight between">
                  <div>
                    <span className="small muted">Kinh nghiệm tích lũy:</span>
                    <div className="stat-xp">{stats.user?.xp || 280} XP</div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <span className="small muted">Chuỗi học tập liên tục:</span>
                    <div className="stat-streak">🔥 {stats.user?.streak || 5} ngày</div>
                  </div>
                </div>

                <div className="row-gap" style={{ marginTop: '1rem' }}>
                  <div className="between">
                    <span>Bài tập đã vượt qua:</span>
                    <b>
                      {stats.completed}/{stats.totalExercises} bài ({Math.round((stats.completed / (stats.totalExercises || 1)) * 100)}%)
                    </b>
                  </div>
                  <ProgressBar value={stats.completed} total={stats.totalExercises} />
                </div>

                <div className="row-gap">
                  <div className="between">
                    <span>Bài lý thuyết đã học:</span>
                    <b>
                      {stats.completedLessons || 0}/{stats.totalLessons || 0} bài
                    </b>
                  </div>
                  <ProgressBar value={stats.completedLessons || 0} total={stats.totalLessons || 1} />
                </div>

                <div className="stats-mini-grid" style={{ marginTop: '1.25rem' }}>
                  <div className="mini-stat card">
                    <div className="mini-val">{stats.submissions}</div>
                    <div className="small muted">Lượt nộp code</div>
                  </div>
                  <div className="mini-stat card">
                    <div className="mini-val">{stats.reviewed}</div>
                    <div className="small muted">Mentor chấm</div>
                  </div>
                  <div className="mini-stat card">
                    <div className="mini-val">{stats.chats}</div>
                    <div className="small muted">Hỏi AI Mentor</div>
                  </div>
                </div>

                {/* Huy hiệu của học viên */}
                <div style={{ marginTop: '1.5rem' }}>
                  <h3 style={{ fontSize: '1.05rem', marginBottom: '0.6rem' }}>🏆 Bộ sưu tập Huy hiệu</h3>
                  <div className="badges-row">
                    {achievements.map((ach) => (
                      <div key={ach.id} className="badge-chip shine-effect" title={`${ach.title}: ${ach.description}`}>
                        <span className="chip-icon">{ach.icon}</span>
                        <span className="chip-text">{ach.title}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </section>
        </div>
      </div>

      {/* Modal Tùy chỉnh Avatar */}
      {showAvatarModal && (
        <AvatarPickerModal
          currentAvatar={user?.avatar}
          onSave={handleAvatarSave}
          onClose={() => setShowAvatarModal(false)}
        />
      )}
    </div>
  );
}
