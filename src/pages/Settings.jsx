import { useState } from 'react';
import { useSettings } from '../context/SettingsContext';
import { resetMock } from '../api/mockDb';

export default function Settings() {
  const {
    theme,
    setTheme,
    fontSize,
    setFontSize,
    fontFamily,
    setFontFamily,
    notifications,
    setNotifications,
    soundEffects,
    setSoundEffects,
    reminder,
    setReminder,
    reminderTime,
    setReminderTime,
    dailyGoal,
    setDailyGoal,
    currentLanguage,
    setCurrentLanguage,
    playSound,
  } = useSettings();

  const [savedMsg, setSavedMsg] = useState(null);

  const handleSave = () => {
    playSound('success');
    setSavedMsg('✅ Đã lưu tất cả các tùy chỉnh cài đặt của bạn!');
    setTimeout(() => setSavedMsg(null), 3000);
  };

  const handleTestSound = () => {
    playSound('success');
  };

  const handleResetData = () => {
    if (
      window.confirm(
        'Bạn có chắc muốn đặt lại toàn bộ tiến độ học tập và bài nộp về trạng thái mẫu ban đầu? Thao tác này không thể hoàn tác.'
      )
    ) {
      resetMock();
      window.location.reload();
    }
  };

  return (
    <div className="settings-page">
      <div className="between settings-header">
        <div>
          <h1>⚙️ Cài Đặt Hệ Thống & Trải Nghiệm Cá Nhân</h1>
          <p className="muted">
            Tùy biến giao diện sáng/tối, âm thanh phản hồi, giờ nhắc nhở học tập và ngôn ngữ lập trình ưu tiên.
          </p>
        </div>
        <button className="btn btn-run" onClick={handleSave}>
          💾 Lưu tất cả cài đặt
        </button>
      </div>

      {savedMsg && <div className="alert ok">{savedMsg}</div>}

      <div className="grid-2">
        {/* Cột 1: Giao diện & Trình soạn thảo */}
        <div>
          {/* Nhóm 1: Giao diện sáng/tối */}
          <section className="card settings-group-card">
            <h2 className="settings-group-title">🎨 Giao diện & Chủ đề (Theme)</h2>
            <p className="muted small">Chọn chế độ hiển thị phù hợp với mắt của bạn trong mọi điều kiện ánh sáng.</p>

            <div className="theme-toggle-row">
              <button
                type="button"
                className={`theme-card-btn ${theme === 'dark' ? 'active' : ''}`}
                onClick={() => setTheme('dark')}
              >
                <div className="theme-preview dark-preview">
                  <div className="preview-header"></div>
                  <div className="preview-lines">
                    <span></span>
                    <span></span>
                  </div>
                </div>
                <div className="theme-btn-label">🌙 Giao diện Tối (Dark Mode)</div>
              </button>

              <button
                type="button"
                className={`theme-card-btn ${theme === 'light' ? 'active' : ''}`}
                onClick={() => setTheme('light')}
              >
                <div className="theme-preview light-preview">
                  <div className="preview-header"></div>
                  <div className="preview-lines">
                    <span></span>
                    <span></span>
                  </div>
                </div>
                <div className="theme-btn-label">☀️ Giao diện Sáng (Light Mode)</div>
              </button>
            </div>
          </section>

          {/* Nhóm 2: Trình soạn thảo mã nguồn */}
          <section className="card settings-group-card">
            <h2 className="settings-group-title">💻 Trình soạn thảo mã nguồn (Code Editor)</h2>

            <label>
              Cỡ chữ trình biên dịch (Font size):
              <div className="between" style={{ marginTop: '0.2rem' }}>
                <input
                  type="range"
                  min="12"
                  max="22"
                  step="1"
                  value={fontSize}
                  onChange={(e) => setFontSize(Number(e.target.value))}
                  style={{ flex: 1, marginRight: '1rem' }}
                />
                <span className="badge badge-primary">{fontSize}px</span>
              </div>
            </label>

            <label>
              Phông chữ lập trình (Monospace Font):
              <select value={fontFamily} onChange={(e) => setFontFamily(e.target.value)}>
                <option value="'Fira Code', monospace">Fira Code (Hỗ trợ Ligatures đẹp mắt)</option>
                <option value="'Consolas', monospace">Consolas (Tiêu chuẩn Windows)</option>
                <option value="'Courier New', monospace">Courier New</option>
              </select>
            </label>

            <label>
              Ngôn ngữ lập trình ưu tiên khởi đầu:
              <select value={currentLanguage} onChange={(e) => setCurrentLanguage(e.target.value)}>
                <option value="python">🐍 Python 3 (Ngôn ngữ AI & Nhập môn)</option>
                <option value="javascript">⚡ JavaScript (ES6+ & Fullstack Web)</option>
                <option value="html">🌐 HTML / CSS (Thiết kế Web Frontend)</option>
                <option value="cpp">⚙️ C++ (Cấu trúc dữ liệu & Lập trình thi đấu)</option>
                <option value="java">☕ Java (Hướng đối tượng & Ứng dụng doanh nghiệp)</option>
                <option value="sql">🗄️ SQL (Cơ sở dữ liệu quan hệ)</option>
              </select>
            </label>
          </section>
        </div>

        {/* Cột 2: Thông báo, Nhắc nhở & Dữ liệu */}
        <div>
          {/* Nhóm 3: Thông báo & Âm thanh */}
          <section className="card settings-group-card">
            <h2 className="settings-group-title">🔔 Thông báo & Âm thanh phản hồi</h2>

            <div className="switch-row between">
              <div>
                <b>Thông báo hệ thống</b>
                <div className="muted small">Nhận thông báo khi Mentor chấm điểm bài nộp hoặc mở khóa huy hiệu.</div>
              </div>
              <input
                type="checkbox"
                checked={notifications}
                onChange={(e) => setNotifications(e.target.checked)}
                className="custom-toggle"
              />
            </div>

            <div className="switch-row between" style={{ marginTop: '1rem' }}>
              <div>
                <b>Âm thanh chúc mừng (Sound Effects)</b>
                <div className="muted small">Phát âm thanh nhẹ khi vượt qua Test Case hoặc trả lời đúng trắc nghiệm.</div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <button type="button" className="btn ghost small-btn" onClick={handleTestSound}>
                  🔊 Nghe thử
                </button>
                <input
                  type="checkbox"
                  checked={soundEffects}
                  onChange={(e) => setSoundEffects(e.target.checked)}
                  className="custom-toggle"
                />
              </div>
            </div>
          </section>

          {/* Nhóm 4: Nhắc nhở học tập & Mục tiêu Streak */}
          <section className="card settings-group-card">
            <h2 className="settings-group-title">🔥 Nhắc nhở học tập & Mục tiêu hàng ngày</h2>

            <div className="switch-row between">
              <div>
                <b>Bật nhắc nhở học tập mỗi ngày</b>
                <div className="muted small">Giữ vững chuỗi Streak 🔥 bằng thông báo nhắc ôn bài đúng giờ.</div>
              </div>
              <input
                type="checkbox"
                checked={reminder}
                onChange={(e) => setReminder(e.target.checked)}
                className="custom-toggle"
              />
            </div>

            {reminder && (
              <div style={{ marginTop: '1rem' }}>
                <label>
                  Khung giờ nhắc nhở hàng ngày:
                  <input
                    type="time"
                    value={reminderTime}
                    onChange={(e) => setReminderTime(e.target.value)}
                  />
                </label>
              </div>
            )}

            <label style={{ marginTop: '1rem' }}>
              Mục tiêu bài tập hoàn thành mỗi ngày:
              <select value={dailyGoal} onChange={(e) => setDailyGoal(Number(e.target.value))}>
                <option value="1">1 bài / ngày (Học nhẹ nhàng)</option>
                <option value="2">2 bài / ngày (Tiêu chuẩn đề xuất)</option>
                <option value="3">3 bài / ngày (Học tập chuyên sâu)</option>
                <option value="5">5 bài / ngày (Chiến binh thực chiến)</option>
              </select>
            </label>
          </section>

          {/* Nhóm 5: Đặt lại dữ liệu */}
          <section className="card settings-group-card danger-zone">
            <h2 className="settings-group-title" style={{ color: 'var(--danger)' }}>
              ⚠️ Vùng quản trị dữ liệu
            </h2>
            <p className="muted small">
              Khôi phục toàn bộ tiến độ, bài nộp và lịch sử trò chuyện về trạng thái mặc định ban đầu.
            </p>
            <button type="button" className="btn danger small-btn" onClick={handleResetData}>
              🔄 Khôi phục toàn bộ dữ liệu mẫu
            </button>
          </section>
        </div>
      </div>
    </div>
  );
}
