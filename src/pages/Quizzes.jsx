import { useEffect, useState } from 'react';
import { topicApi, quizApi } from '../api/services';

export default function Quizzes() {
  const [topics, setTopics] = useState([]);
  const [activeTopic, setActiveTopic] = useState('all');
  const [quizzes, setQuizzes] = useState([]);
  const [userAnswers, setUserAnswers] = useState({}); // { [quizId]: selectedIndex }
  const [revealed, setRevealed] = useState({}); // { [quizId]: boolean }

  useEffect(() => {
    topicApi.list().then(setTopics);
  }, []);

  useEffect(() => {
    const topicId = activeTopic === 'all' ? null : activeTopic;
    quizApi.list(topicId).then(setQuizzes);
  }, [activeTopic]);

  const handleSelectOption = (quizId, optIdx) => {
    if (revealed[quizId]) return; // đã trả lời thì không chọn lại
    setUserAnswers((prev) => ({ ...prev, [quizId]: optIdx }));
    setRevealed((prev) => ({ ...prev, [quizId]: true }));
  };

  const handleReset = () => {
    setUserAnswers({});
    setRevealed({});
  };

  const totalAnswered = Object.keys(userAnswers).length;
  const totalCorrect = quizzes.filter(
    (q) => userAnswers[q.id] !== undefined && userAnswers[q.id] === q.correctIndex
  ).length;

  return (
    <div className="quizzes-page">
      <div className="between quizzes-header">
        <div>
          <h1>🧠 Trắc nghiệm Ôn luyện Kiến thức</h1>
          <p className="muted">
            Kiểm tra mức độ thấu hiểu cú pháp, cơ chế hoạt động và tránh các bẫy phổ biến trong lập trình Python.
          </p>
        </div>
        {totalAnswered > 0 && (
          <div className="quiz-score-badge card">
            <span className="small">Điểm số:</span>
            <b style={{ color: 'var(--primary)', fontSize: '1.2rem' }}>
              {totalCorrect}/{quizzes.length}
            </b>
            <span className="muted small">({Math.round((totalCorrect / (quizzes.length || 1)) * 100)}%)</span>
            <button className="btn ghost small-btn" onClick={handleReset} style={{ marginLeft: '0.5rem' }}>
              ↺ Làm lại
            </button>
          </div>
        )}
      </div>

      {/* Tabs lọc theo chủ đề */}
      <div className="tabs" style={{ marginBottom: '1.5rem' }}>
        <button
          className={`tab ${activeTopic === 'all' ? 'active' : ''}`}
          onClick={() => setActiveTopic('all')}
        >
          Tất cả chủ đề ({quizzes.length})
        </button>
        {topics.map((t) => (
          <button
            key={t.id}
            className={`tab ${activeTopic === t.id ? 'active' : ''}`}
            onClick={() => setActiveTopic(t.id)}
          >
            {t.icon} {t.name.split('.')[1] || t.name}
          </button>
        ))}
      </div>

      {/* Danh sách câu hỏi */}
      <div className="quiz-list">
        {quizzes.length === 0 ? (
          <p className="muted">Không có câu hỏi trắc nghiệm nào cho chủ đề này.</p>
        ) : (
          quizzes.map((q, idx) => {
            const isAnswered = revealed[q.id];
            const selectedOpt = userAnswers[q.id];
            const isCorrect = selectedOpt === q.correctIndex;
            const topicObj = topics.find((t) => t.id === q.topicId);

            return (
              <div key={q.id} className={`card quiz-card ${isAnswered ? (isCorrect ? 'quiz-pass' : 'quiz-fail') : ''}`}>
                <div className="between quiz-top">
                  <span className="badge badge-neutral">Câu hỏi {idx + 1}/{quizzes.length}</span>
                  {topicObj && <span className="small muted">{topicObj.name}</span>}
                </div>

                <h3 className="quiz-question">{q.question}</h3>

                <div className="quiz-options">
                  {q.options.map((opt, oIdx) => {
                    let optClass = 'quiz-opt';
                    if (isAnswered) {
                      if (oIdx === q.correctIndex) {
                        optClass += ' opt-correct';
                      } else if (selectedOpt === oIdx) {
                        optClass += ' opt-wrong';
                      }
                    } else if (selectedOpt === oIdx) {
                      optClass += ' opt-selected';
                    }

                    return (
                      <button
                        key={oIdx}
                        className={optClass}
                        disabled={isAnswered}
                        onClick={() => handleSelectOption(q.id, oIdx)}
                      >
                        <span className="opt-index">{String.fromCharCode(65 + oIdx)}</span>
                        <span className="opt-text">{opt}</span>
                        {isAnswered && oIdx === q.correctIndex && <span className="opt-status">✓ Đúng</span>}
                        {isAnswered && selectedOpt === oIdx && oIdx !== q.correctIndex && (
                          <span className="opt-status">✕ Sai</span>
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* Giải thích chi tiết khi đã trả lời */}
                {isAnswered && (
                  <div className="quiz-explanation card">
                    <div className="exp-title">
                      {isCorrect ? '🎉 Bạn đã trả lời chính xác!' : '💡 Giải thích chi tiết:'}
                    </div>
                    <p className="exp-text">{q.explanation}</p>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
