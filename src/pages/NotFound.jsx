import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="auth-page">
      <div className="card auth-card">
        <h1>404</h1>
        <p className="muted">Không tìm thấy trang.</p>
        <Link className="btn" to="/">Về trang chủ</Link>
      </div>
    </div>
  );
}
