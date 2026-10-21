import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { cheatsheetApi } from '../api/services';

export default function CheatSheet() {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState('');
  const [copiedIdx, setCopiedIdx] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    cheatsheetApi.list().then(setData);
  }, []);

  const handleCopy = (text, id) => {
    navigator.clipboard.writeText(text);
    setCopiedIdx(id);
    setTimeout(() => setCopiedIdx(null), 2000);
  };

  const filteredCategories = data
    .map((cat) => ({
      ...cat,
      items: cat.items.filter(
        (it) =>
          it.title.toLowerCase().includes(search.toLowerCase()) ||
          it.syntax.toLowerCase().includes(search.toLowerCase()) ||
          it.description.toLowerCase().includes(search.toLowerCase())
      ),
    }))
    .filter((cat) => cat.items.length > 0);

  return (
    <div className="cheatsheet-page">
      <div className="between cheatsheet-header">
        <div>
          <h1>📖 Sổ tay Tra cứu Nhanh Cú pháp Python</h1>
          <p className="muted">
            Tóm tắt các cú pháp, phương thức và ví dụ thông dụng nhất. Không cần phải học vẹt, tra cứu là nhớ!
          </p>
        </div>
      </div>

      {/* Ô tìm kiếm */}
      <div className="search-bar card">
        <span className="search-icon">🔍</span>
        <input
          type="text"
          className="search-input"
          placeholder="Tìm kiếm cú pháp (ví dụ: f-string, list comprehension, for, dict, def)..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        {search && (
          <button className="btn ghost small-btn" onClick={() => setSearch('')}>
            Xóa tìm kiếm
          </button>
        )}
      </div>

      {/* Danh sách danh mục tra cứu */}
      <div className="cheatsheet-content">
        {filteredCategories.length === 0 ? (
          <p className="muted" style={{ padding: '2rem', textAlign: 'center' }}>
            Không tìm thấy cú pháp nào khớp với từ khóa "{search}".
          </p>
        ) : (
          filteredCategories.map((cat, cIdx) => (
            <section key={cIdx} className="cheat-section">
              <h2 className="cheat-category-title">{cat.category}</h2>

              <div className="grid-2">
                {cat.items.map((item, iIdx) => {
                  const uniqueKey = `${cIdx}_${iIdx}`;
                  return (
                    <div key={iIdx} className="card cheat-card">
                      <div className="between">
                        <h3 className="cheat-title">{item.title}</h3>
                        <div className="actions" style={{ margin: 0 }}>
                          <button
                            className="btn ghost small-btn"
                            onClick={() => handleCopy(item.example, uniqueKey)}
                          >
                            {copiedIdx === uniqueKey ? '✓ Đã chép' : '📋 Chép ví dụ'}
                          </button>
                        </div>
                      </div>

                      <p className="cheat-desc">{item.description}</p>

                      <div className="cheat-syntax-box">
                        <span className="small muted">Cú pháp chuẩn:</span>
                        <pre className="code-block" style={{ margin: '0.3rem 0 0.6rem' }}>
                          {item.syntax}
                        </pre>
                      </div>

                      <div className="cheat-example-box">
                        <span className="small muted">Ví dụ thực tế:</span>
                        <pre className="code-block" style={{ margin: '0.3rem 0 0' }}>
                          {item.example}
                        </pre>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
          ))
        )}
      </div>
    </div>
  );
}
