import { useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { USE_MOCK } from '../api/services';

export default function Login() {
  const { user, login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  if (user) return <Navigate to="/" replace />;

  async function submit(e) {
    e.preventDefault();
    setError('');
    setBusy(true);
    try {
      await login(form);
      navigate('/');
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  }

  const fillAccount = (email, password) => {
    setForm({ email, password });
    setError('');
  };

  return (
    <div className="auth-page auth-bg-theme">
      <div className="auth-overlay"></div>

      <div className="auth-container">
        <form className="auth-card glass-card" onSubmit={submit}>
          <div className="auth-brand">
            <span className="brand-logo-large">&lt;/&gt;</span>
            <div className="auth-brand-text">
              <span className="brand-name">CodeLearn</span>
              <span className="brand-badge">PRO</span>
            </div>
          </div>

          <h1 className="auth-title">Chào mừng trở lại! 👋</h1>
          <p className="auth-subtitle">
            Học lập trình thực chiến, thực thi đa ngôn ngữ và chinh phục thử thách cùng AI.
          </p>

          {/* Nút đăng nhập thử nhanh 1-click */}
          {USE_MOCK && (
            <div className="demo-accounts-box">
              <span className="demo-title">Đăng nhập thử 1-chạm:</span>
              <div className="demo-buttons">
                <button
                  type="button"
                  className="demo-btn student-demo"
                  onClick={() => fillAccount('student@demo.com', '123456')}
                >
                  👨‍🎓 Học viên Demo
                </button>
                <button
                  type="button"
                  className="demo-btn mentor-demo"
                  onClick={() => fillAccount('mentor@demo.com', '123456')}
                >
                  👨‍🏫 Mentor Demo
                </button>
              </div>
            </div>
          )}

          <label className="auth-label">
            <span>Địa chỉ Email</span>
            <div className="input-with-icon">
              <span className="input-icon">✉️</span>
              <input
                type="email"
                required
                placeholder="name@example.com"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
            </div>
          </label>

          <label className="auth-label">
            <div className="between">
              <span>Mật khẩu</span>
              <span className="small muted">Mặc định: 123456</span>
            </div>
            <div className="input-with-icon">
              <span className="input-icon">🔒</span>
              <input
                type={showPassword ? 'text' : 'password'}
                required
                placeholder="••••••••"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
              />
              <button
                type="button"
                className="btn-toggle-pw"
                onClick={() => setShowPassword(!showPassword)}
                title={showPassword ? 'Ẩn mật khẩu' : 'Hiện mật khẩu'}
              >
                {showPassword ? '👁️' : '👁️‍🗨️'}
              </button>
            </div>
          </label>

          {error && <div className="alert error">{error}</div>}

          <button className="btn btn-auth" disabled={busy}>
            {busy ? '⏳ Đang đăng nhập...' : 'Đăng nhập vào hệ thống →'}
          </button>

          <div className="auth-footer between">
            <span className="small">Chưa có tài khoản?</span>
            <Link to="/register" className="auth-link">
              Tạo tài khoản mới
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
