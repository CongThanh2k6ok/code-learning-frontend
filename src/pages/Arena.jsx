import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../context/AuthContext';
import { useSettings } from '../context/SettingsContext';
import CodeEditor from '../components/CodeEditor';
import UserAvatar from '../components/UserAvatar';
import { runPython } from '../utils/pythonRunner';

// Danh sách đối thủ AI
const BOTS = [
  {
    id: 'bot_rookie',
    name: '🤖 ByteBot Tập Sự',
    elo: 1150,
    avatar: '🤖',
    speed: 0.7, // tỷ lệ tiến độ mỗi 2s
    accuracy: 0.85,
    tag: 'Dễ',
  },
  {
    id: 'bot_ninja',
    name: '🥷 CodeNinja Hacker',
    elo: 1320,
    avatar: '🥷',
    speed: 1.1,
    accuracy: 0.95,
    tag: 'Trung bình',
  },
  {
    id: 'bot_master',
    name: '🧙‍♂️ Grandmaster AI',
    elo: 1650,
    avatar: '🧙‍♂️',
    speed: 1.6,
    accuracy: 1.0,
    tag: 'Khó',
  },
];

// Danh sách bài toán thách đấu 1v1
const ARENA_CHALLENGES = [
  {
    id: 1,
    title: 'Đảo ngược chuỗi ký tự',
    description: 'Viết hàm `reverse_string(s)` nhận vào một chuỗi `s` và trả về chuỗi đảo ngược.',
    starterCode: 'def reverse_string(s):\n    # Viết mã của bạn ở đây\n    pass\n',
    testCases: [
      { input: "'hello'", expected: "'olleh'", call: 'reverse_string("hello")' },
      { input: "'codelearn'", expected: "'nraeledoc'", call: 'reverse_string("codelearn")' },
      { input: "'12345'", expected: "'54321'", call: 'reverse_string("12345")' },
    ],
    solution: 'def reverse_string(s):\n    return s[::-1]\n',
    timeLimit: 120, // 2 phút
  },
  {
    id: 2,
    title: 'Tìm số nguyên tố',
    description: 'Viết hàm `is_prime(n)` kiểm tra xem số nguyên dương `n` có phải là số nguyên tố hay không (trả về True hoặc False).',
    starterCode: 'def is_prime(n):\n    # Viết mã của bạn ở đây\n    pass\n',
    testCases: [
      { input: '7', expected: 'True', call: 'is_prime(7)' },
      { input: '4', expected: 'False', call: 'is_prime(4)' },
      { input: '13', expected: 'True', call: 'is_prime(13)' },
      { input: '1', expected: 'False', call: 'is_prime(1)' },
    ],
    solution: 'def is_prime(n):\n    if n < 2: return False\n    for i in range(2, int(n**0.5) + 1):\n        if n % i == 0: return False\n    return True\n',
    timeLimit: 150,
  },
  {
    id: 3,
    title: 'Tính tổng các số chẵn trong mảng',
    description: 'Viết hàm `sum_even(numbers)` nhận vào một danh sách các số nguyên và trả về tổng của tất cả các số chẵn.',
    starterCode: 'def sum_even(numbers):\n    # Viết mã của bạn ở đây\n    pass\n',
    testCases: [
      { input: '[1, 2, 3, 4, 5, 6]', expected: '12', call: 'sum_even([1, 2, 3, 4, 5, 6])' },
      { input: '[1, 3, 5]', expected: '0', call: 'sum_even([1, 3, 5])' },
      { input: '[2, 4, 6, 8]', expected: '20', call: 'sum_even([2, 4, 6, 8])' },
    ],
    solution: 'def sum_even(numbers):\n    return sum(x for x in numbers if x % 2 == 0)\n',
    timeLimit: 120,
  },
];

export default function Arena() {
  const { user, updateProfile } = useAuth();
  const { playSound } = useSettings();

  // Trạng thái trận đấu: 'lobby' | 'countdown' | 'battling' | 'finished'
  const [matchState, setMatchState] = useState('lobby');
  const [selectedBot, setSelectedBot] = useState(BOTS[1]); // Ninja mặc định
  const [challenge, setChallenge] = useState(ARENA_CHALLENGES[0]);

  // Code của người chơi
  const [playerCode, setPlayerCode] = useState(challenge.starterCode);
  const [playerProgress, setPlayerProgress] = useState(0); // 0 - 100%
  const [playerTestResults, setPlayerTestResults] = useState([]);
  const [isRunning, setIsRunning] = useState(false);

  // Tiến trình của bot
  const [botProgress, setBotProgress] = useState(0);
  const [botStatusText, setBotStatusText] = useState('Đang đọc đề bài...');

  // Thời gian
  const [timeLeft, setTimeLeft] = useState(challenge.timeLimit);
  const [matchResult, setMatchResult] = useState(null); // 'win' | 'lose' | 'timeout'
  const [countdownNum, setCountdownNum] = useState(3);

  const timerRef = useRef(null);
  const botIntervalRef = useRef(null);

  // Khởi động trận đấu
  const startMatch = () => {
    playSound('click');
    // Chọn đề ngẫu nhiên
    const randomChallenge = ARENA_CHALLENGES[Math.floor(Math.random() * ARENA_CHALLENGES.length)];
    setChallenge(randomChallenge);
    setPlayerCode(randomChallenge.starterCode);
    setPlayerProgress(0);
    setPlayerTestResults([]);
    setBotProgress(0);
    setTimeLeft(randomChallenge.timeLimit);
    setMatchResult(null);

    setMatchState('countdown');
    setCountdownNum(3);

    let count = 3;
    const cd = setInterval(() => {
      count -= 1;
      if (count > 0) {
        setCountdownNum(count);
        playSound('click');
      } else {
        clearInterval(cd);
        setMatchState('battling');
        playSound('success');
      }
    }, 1000);
  };

  // Vòng lặp đếm ngược thời gian và mô phỏng hành vi bot
  useEffect(() => {
    if (matchState !== 'battling') return;

    // Timer trận đấu
    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          handleFinish('timeout');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    // Bot simulator
    const botPhases = [
      'Đang phân tích cấu trúc giải thuật...',
      'Đang viết vòng lặp và xử lý điều kiện...',
      'Đang tối ưu độ phức tạp Big-O...',
      'Đang chạy thử nghiệm test cases...',
      'Sắp hoàn thiện bài làm...',
    ];

    botIntervalRef.current = setInterval(() => {
      setBotProgress((prev) => {
        const increment = (Math.random() * 4 + 2) * selectedBot.speed;
        const next = Math.min(100, Math.round(prev + increment));

        // Cập nhật câu thoại của bot
        const phaseIdx = Math.min(botPhases.length - 1, Math.floor((next / 100) * botPhases.length));
        setBotStatusText(botPhases[phaseIdx]);

        // Nếu bot đạt 100% trước người chơi
        if (next >= 100) {
          clearInterval(botIntervalRef.current);
          clearInterval(timerRef.current);
          handleFinish('lose');
        }
        return next;
      });
    }, 1200);

    return () => {
      clearInterval(timerRef.current);
      clearInterval(botIntervalRef.current);
    };
  }, [matchState, selectedBot]);

  // Kiểm tra test case của người chơi
  const runPlayerTests = async () => {
    setIsRunning(true);
    playSound('click');

    const results = [];
    let passCount = 0;

    for (const tc of challenge.testCases) {
      const runnerCode = `${playerCode}\n\nprint(${tc.call})`;
      try {
        const res = await runPython(runnerCode);
        const actual = res.stdout ? res.stdout.trim() : '';
        const expected = tc.expected.trim().replace(/^['"]|['"]$/g, '');
        const actualClean = actual.replace(/^['"]|['"]$/g, '');
        const passed = actualClean === expected;

        if (passed) passCount++;
        results.push({
          call: tc.call,
          expected: tc.expected,
          actual: actual || '(Không có kết quả)',
          passed,
        });
      } catch (err) {
        results.push({
          call: tc.call,
          expected: tc.expected,
          actual: 'Lỗi cú pháp: ' + err.message,
          passed: false,
        });
      }
    }

    setPlayerTestResults(results);
    const progress = Math.round((passCount / challenge.testCases.length) * 100);
    setPlayerProgress(progress);
    setIsRunning(false);

    if (passCount === challenge.testCases.length) {
      // Vượt qua toàn bộ test cases -> CHIẾN THẮNG!
      clearInterval(botIntervalRef.current);
      clearInterval(timerRef.current);
      handleFinish('win');
    } else {
      playSound('error');
    }
  };

  // Xử lý kết thúc trận đấu
  const handleFinish = async (result) => {
    setMatchResult(result);
    setMatchState('finished');

    if (result === 'win') {
      playSound('complete');
      const eloGain = 25;
      const currentElo = user?.arenaElo || 1200;
      const currentWins = user?.arenaWins || 0;
      try {
        await updateProfile({
          arenaElo: currentElo + eloGain,
          arenaWins: currentWins + 1,
        });
      } catch (e) {
        console.error(e);
      }
    } else {
      playSound('error');
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const playerElo = user?.arenaElo || 1280;

  return (
    <div className="arena-page">
      {/* Sảnh chờ thách đấu (Lobby) */}
      {matchState === 'lobby' && (
        <div className="arena-lobby-wrap">
          <div className="arena-hero card">
            <div className="arena-badge-live">⚡ LIVE SPEED CODING ARENA</div>
            <h1 className="arena-title">⚔️ Đấu Trường Lập Trình 1v1</h1>
            <p className="arena-subtitle">
              Thách đấu tốc độ giải thuật thời gian thực cùng các AI Coder hoặc kỳ phùng địch thủ. Vượt qua mọi test case nhanh nhất để đoạt lấy điểm ELO xếp hạng danh giá!
            </p>

            <div className="arena-user-stats-strip between">
              <div className="strip-item">
                <span className="small muted">Xếp hạng của bạn</span>
                <div className="strip-val gold">🏆 {playerElo} ELO</div>
              </div>
              <div className="strip-item">
                <span className="small muted">Trận thắng 1v1</span>
                <div className="strip-val green">⚔️ {user?.arenaWins || 14} trận</div>
              </div>
              <div className="strip-item">
                <span className="small muted">Hạng đấu trường</span>
                <div className="strip-val purple">
                  {playerElo > 1500 ? 'Kim Cương' : playerElo > 1300 ? 'Bạch Kim' : 'Vàng'}
                </div>
              </div>
            </div>
          </div>

          <div className="arena-select-bot-section">
            <h2 className="section-title">Chọn đối thủ thách đấu</h2>
            <div className="bots-grid">
              {BOTS.map((bot) => (
                <div
                  key={bot.id}
                  className={`bot-card card ${selectedBot.id === bot.id ? 'active' : ''}`}
                  onClick={() => setSelectedBot(bot)}
                >
                  <div className="bot-avatar-large">{bot.avatar}</div>
                  <h3 className="bot-name">{bot.name}</h3>
                  <div className="bot-elo">ELO: <b>{bot.elo}</b></div>
                  <span className={`bot-diff-tag ${bot.tag.toLowerCase()}`}>{bot.tag}</span>
                  <div className="small muted" style={{ marginTop: '0.6rem' }}>
                    Tốc độ gõ code: {Math.round(bot.speed * 60)} WPM
                  </div>
                </div>
              ))}
            </div>

            <div className="center-action" style={{ marginTop: '2rem' }}>
              <button className="btn arena-start-btn" onClick={startMatch}>
                🔥 BẮT ĐẦU THÁCH ĐẤU NGAY
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Màn hình đếm ngược kịch tính */}
      {matchState === 'countdown' && (
        <div className="arena-countdown-overlay">
          <div className="countdown-box">
            <div className="countdown-label">TRẬN ĐẤU SẼ BẮT ĐẦU TRONG</div>
            <div className="countdown-number">{countdownNum}</div>
            <div className="countdown-sub">Hãy chuẩn bị tư thế sẵn sàng gõ mã!</div>
          </div>
        </div>
      )}

      {/* Sàn đấu trực tiếp (Battling & Finished) */}
      {(matchState === 'battling' || matchState === 'finished') && (
        <div className="arena-battle-stage">
          {/* Header thi đấu thời gian thực */}
          <div className="arena-hud card between">
            {/* Người chơi */}
            <div className="hud-player left">
              <UserAvatar user={user} size="lg" />
              <div>
                <div className="hud-player-name">{user?.name} (Bạn)</div>
                <div className="hud-elo small muted">{playerElo} ELO</div>
                <div className="hud-progress-bar-wrap">
                  <div className="hud-progress-fill player" style={{ width: `${playerProgress}%` }} />
                </div>
                <div className="hud-pass-text small">{playerProgress}% Test cases</div>
              </div>
            </div>

            {/* Đồng hồ LED đếm ngược */}
            <div className="hud-center">
              <div className={`hud-timer ${timeLeft < 30 ? 'critical' : ''}`}>
                ⏱️ {formatTime(timeLeft)}
              </div>
              <div className="small muted">Đề: {challenge.title}</div>
            </div>

            {/* Đối thủ Bot */}
            <div className="hud-player right">
              <div style={{ textAlign: 'right' }}>
                <div className="hud-player-name">{selectedBot.name}</div>
                <div className="hud-elo small muted">{selectedBot.elo} ELO</div>
                <div className="hud-progress-bar-wrap">
                  <div className="hud-progress-fill bot" style={{ width: `${botProgress}%` }} />
                </div>
                <div className="hud-pass-text small">{botProgress}% Tiến độ giải</div>
              </div>
              <div className="hud-bot-avatar">{selectedBot.avatar}</div>
            </div>
          </div>

          <div className="arena-battle-grid">
            {/* Khung Soạn thảo & Test case của bạn */}
            <div className="arena-code-col">
              <div className="card challenge-box">
                <div className="between">
                  <h3 style={{ margin: 0 }}>📋 Yêu cầu: {challenge.title}</h3>
                  <span className="badge badge-primary">Python 3</span>
                </div>
                <p className="challenge-desc">{challenge.description}</p>
              </div>

              <div className="card editor-wrap-card">
                <div className="between editor-bar">
                  <span className="small muted">Trình biên tập mã chiến trường</span>
                  <button
                    className="btn small-btn"
                    onClick={runPlayerTests}
                    disabled={isRunning || matchState === 'finished'}
                  >
                    {isRunning ? '⏳ Đang chấm...' : '⚡ Chạy Kiểm Tra & Nộp Bài'}
                  </button>
                </div>
                <CodeEditor
                  code={playerCode}
                  onChange={setPlayerCode}
                  language="python"
                />
              </div>

              {/* Bảng kết quả test cases */}
              {playerTestResults.length > 0 && (
                <div className="card test-results-card">
                  <h4>Kết quả Test Cases của bạn:</h4>
                  <div className="test-items-list">
                    {playerTestResults.map((tr, idx) => (
                      <div key={idx} className={`arena-test-row ${tr.passed ? 'pass' : 'fail'}`}>
                        <span className="test-badge">{tr.passed ? '✓ ĐÚNG' : '✕ SAI'}</span>
                        <code>{tr.call}</code>
                        <span className="small muted">Mong đợi: <b>{tr.expected}</b> | Nhận được: <b>{tr.actual}</b></span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Màn hình Rada theo dõi đối thủ */}
            <div className="arena-opponent-col">
              <div className="card bot-radar-card">
                <div className="between">
                  <h4>📡 Màn hình quan sát đối thủ</h4>
                  <span className="dot-pulse" />
                </div>

                <div className="bot-radar-body">
                  <div className="bot-radar-avatar-bounce">{selectedBot.avatar}</div>
                  <div className="bot-radar-status">{botStatusText}</div>
                  <div className="bot-typing-indicator">
                    <span className="typing-dot" />
                    <span className="typing-dot" />
                    <span className="typing-dot" />
                    <span>Đối thủ đang gõ code với tốc độ cao...</span>
                  </div>

                  <div className="bot-simulated-code card">
                    <div className="code-fake-line w-80" />
                    <div className="code-fake-line w-60" />
                    <div className="code-fake-line w-90" />
                    <div className="code-fake-line w-40" />
                    <div className="code-fake-line w-75" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Modal Kết Quả Trận Đấu */}
          {matchState === 'finished' && (
            <div className="modal-backdrop">
              <div className="modal-card arena-result-modal">
                <div className={`result-icon ${matchResult}`}>
                  {matchResult === 'win' ? '🏆' : matchResult === 'lose' ? '💀' : '⏰'}
                </div>

                <h2 className="result-title">
                  {matchResult === 'win' && 'CHIẾN THẮNG ÁP ĐẢO!'}
                  {matchResult === 'lose' && 'BẠN ĐÃ THUA TRẬN NÀY'}
                  {matchResult === 'timeout' && 'HẾT GIỜ THI ĐẤU!'}
                </h2>

                <p className="result-desc">
                  {matchResult === 'win' && 'Xuất sắc! Bạn đã vượt qua 100% test case trước đối thủ.'}
                  {matchResult === 'lose' && `${selectedBot.name} đã hoàn thành bài giải trước bạn.`}
                  {matchResult === 'timeout' && 'Cả hai bên không hoàn thành kịp thời gian quy định.'}
                </p>

                <div className="result-rewards-box">
                  {matchResult === 'win' ? (
                    <>
                      <div className="reward-pill gold">+25 ELO Đấu trường</div>
                      <div className="reward-pill purple">+100 XP Thưởng</div>
                    </>
                  ) : (
                    <div className="reward-pill gray">Không thay đổi điểm ELO</div>
                  )}
                </div>

                <div className="modal-actions center" style={{ marginTop: '1.5rem', gap: '1rem' }}>
                  <button className="btn ghost" onClick={() => setMatchState('lobby')}>
                    Quay về Sảnh Đấu
                  </button>
                  <button className="btn" onClick={startMatch}>
                    🔄 Thách Đấu Lại Ngay
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
