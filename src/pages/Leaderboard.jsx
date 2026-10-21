import { useEffect, useState } from 'react';
import { leaderboardApi, achievementApi } from '../api/services';
import { useAuth } from '../context/AuthContext';
import UserAvatar from '../components/UserAvatar';

export default function Leaderboard() {
  const { user } = useAuth();
  const [students, setStudents] = useState([]);
  const [achievements, setAchievements] = useState([]);
  const [activeTab, setActiveTab] = useState('ranking'); // 'ranking' | 'achievements'

  useEffect(() => {
    leaderboardApi.get().then(setStudents);
    achievementApi.list().then(setAchievements);
  }, []);

  const top3 = students.slice(0, 3);
  const remaining = students.slice(3);

  return (
    <div className="leaderboard-page">
      <div className="between leaderboard-header">
        <div>
          <h1>🏆 Bảng Vinh Danh & Thành Tích Học Tập</h1>
          <p className="muted">
            Thi đua học tập, tích lũy điểm kinh nghiệm (XP), duy trì chuỗi Streak và mở khóa các huy hiệu cao quý!
          </p>
        </div>
        <div className="tabs" style={{ margin: 0 }}>
          <button
            className={`tab ${activeTab === 'ranking' ? 'active' : ''}`}
            onClick={() => setActiveTab('ranking')}
          >
            🥇 Bảng xếp hạng tuần
          </button>
          <button
            className={`tab ${activeTab === 'achievements' ? 'active' : ''}`}
            onClick={() => setActiveTab('achievements')}
          >
            🎖️ Bộ sưu tập Huy hiệu ({achievements.length})
          </button>
        </div>
      </div>

      {activeTab === 'ranking' ? (
        <div>
          {/* Top 3 Podium */}
          {students.length > 0 && (
            <div className="podium-container">
              {/* Hạng 2 */}
              {students[1] && (
                <div className="podium-item podium-2">
                  <div className="podium-avatar">
                    <UserAvatar user={students[1]} size="lg" />
                    <span className="podium-medal">🥈</span>
                  </div>
                  <div className="podium-name">{students[1].name}</div>
                  <div className="podium-xp">{students[1].xp} XP</div>
                  <div className="podium-streak">🔥 {students[1].streak} ngày</div>
                  <div className="podium-stand stand-2">
                    <span className="stand-rank">#2</span>
                  </div>
                </div>
              )}

              {/* Hạng 1 */}
              {students[0] && (
                <div className="podium-item podium-1">
                  <div className="crown">👑</div>
                  <div className="podium-avatar">
                    <UserAvatar user={students[0]} size="xl" />
                    <span className="podium-medal">🥇</span>
                  </div>
                  <div className="podium-name">{students[0].name}</div>
                  <div className="podium-xp">{students[0].xp} XP</div>
                  <div className="podium-streak">🔥 {students[0].streak} ngày</div>
                  <div className="podium-stand stand-1">
                    <span className="stand-rank">#1</span>
                  </div>
                </div>
              )}

              {/* Hạng 3 */}
              {students[2] && (
                <div className="podium-item podium-3">
                  <div className="podium-avatar">
                    <UserAvatar user={students[2]} size="lg" />
                    <span className="podium-medal">🥉</span>
                  </div>
                  <div className="podium-name">{students[2].name}</div>
                  <div className="podium-xp">{students[2].xp} XP</div>
                  <div className="podium-streak">🔥 {students[2].streak} ngày</div>
                  <div className="podium-stand stand-3">
                    <span className="stand-rank">#3</span>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Bảng danh sách chi tiết */}
          <div className="card rank-table-card">
            <h2>Bảng xếp hạng đầy đủ</h2>
            <div className="rank-table-wrap">
              <table className="rank-table">
                <thead>
                  <tr>
                    <th>Thứ hạng</th>
                    <th>Học viên</th>
                    <th>Cấp bậc</th>
                    <th>Chuỗi Streak</th>
                    <th>Bài đã nộp</th>
                    <th>Kinh nghiệm (XP)</th>
                  </tr>
                </thead>
                <tbody>
                  {students.map((s, idx) => {
                    const isMe = s.id === user.id;
                    const studentData = isMe ? { ...s, avatar: user.avatar } : s;
                    return (
                      <tr key={s.id} className={isMe ? 'row-me' : ''}>
                        <td className="rank-col">
                          {idx === 0 ? '🥇' : idx === 1 ? '🥈' : idx === 2 ? '🥉' : `#${idx + 1}`}
                        </td>
                        <td className="name-col">
                          <div className="row-center gap-2">
                            <UserAvatar user={studentData} size="xs" />
                            <b>{s.name}</b>
                            {isMe && <span className="badge badge-primary">Bạn</span>}
                          </div>
                        </td>
                        <td>
                          <span className="badge badge-neutral">{s.level}</span>
                        </td>
                        <td>🔥 {s.streak} ngày</td>
                        <td>{s.submissionsCount} bài</td>
                        <td className="xp-col">
                          <b>{s.xp} XP</b>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      ) : (
        /* Tab Danh sách Huy hiệu */
        <div className="achievements-grid grid-2">
          {achievements.map((ach) => (
            <div key={ach.id} className="card achievement-card">
              <div className="ach-icon">{ach.icon}</div>
              <div className="ach-body">
                <div className="between">
                  <h3 className="ach-title">{ach.title}</h3>
                  <span className="badge badge-warn">+{ach.xp} XP</span>
                </div>
                <p className="ach-desc">{ach.description}</p>
                <div className="ach-status">
                  <span className="badge badge-success">✓ Sẵn sàng mở khóa</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
