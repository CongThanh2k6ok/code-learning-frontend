import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  async function submit(e) {
    e.preventDefault();
    if (form.password !== form.confirm) return setError('Mật khẩu xác nhận không khớp.');
    if (form.password.length < 6) return setError('Mật khẩu tối thiểu phải từ 6 ký tự.');
    setError('');
    setBusy(true);
    try {
      await register({ name: form.name, email: form.email, password: form.password });
      navigate('/');
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  }

  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

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

          <h1 className="auth-title">Tạo tài khoản mới 🚀</h1>
          <p className="auth-subtitle">
            Gia nhập cộng đồng học lập trình tương tác cùng trợ lý AI thông minh.
          </p>

          <label className="auth-label">
            <span>Họ và tên của bạn</span>
            <div className="input-with-icon">
              <span className="input-icon">👤</span>
              <input
                required
                placeholder="Nguyễn Văn A"
                value={form.name}
                onChange={set('name')}
              />
            </div>
          </label>

          <label className="auth-label">
            <span>Địa chỉ Email</span>
            <div className="input-with-icon">
              <span className="input-icon">✉️</span>
              <input
                type="email"
                required
                placeholder="name@example.com"
                value={form.email}
                onChange={set('email')}
              />
            </div>
          </label>

          <label className="auth-label">
            <span>Mật khẩu (tối thiểu 6 ký tự)</span>
            <div className="input-with-icon">
              <span className="input-icon">🔒</span>
              <input
                type={showPassword ? 'text' : 'password'}
                required
                placeholder="••••••••"
                value={form.password}
                onChange={set('password')}
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

          <label className="auth-label">
            <span>Xác nhận lại mật khẩu</span>
            <div className="input-with-icon">
              <span className="input-icon">🔑</span>
              <input
                type={showPassword ? 'text' : 'password'}
                required
                placeholder="••••••••"
                value={form.confirm}
                onChange={set('confirm')}
              />
            </div>
          </label>

          {error && <div className="alert error">{error}</div>}

          <button className="btn btn-auth" disabled={busy}>
            {busy ? '⏳ Đang tạo tài khoản...' : 'Tạo tài khoản & Bắt đầu học →'}
          </button>

          <div className="auth-footer between">
            <span className="small">Đã có tài khoản?</span>
            <Link to="/login" className="auth-link">
              Đăng nhập ngay
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
