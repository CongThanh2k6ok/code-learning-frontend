import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { statsApi, topicApi } from '../api/services';

const ROADMAP_STAGES = [
  {
    stage: 1,
    title: 'Chặng 1: Nền tảng & Cú pháp cơ bản',
    level: 'Nhập môn',
    description: 'Nắm vững cách máy tính lưu trữ thông tin, khai báo biến, các kiểu số nguyên, số thực, chuỗi và toán tử số học.',
    topicId: 1,
    skills: ['Biến số & Snake_case', 'int, float, str, bool', 'Toán tử +, -, *, /, //, %', 'Ép kiểu int() & float()'],
  },
  {
    stage: 2,
    title: 'Chặng 2: Tư duy Logic & Cấu trúc rẽ nhánh',
    level: 'Cơ bản',
    description: 'Giúp chương trình có khả năng tự ra quyết định dựa trên điều kiện thực tế với câu lệnh if, elif, else.',
    topicId: 2,
    skills: ['if / elif / else', 'Quy tắc thụt lề 4 space', 'Toán tử and, or, not', 'Toán tử 3 ngôi (Ternary)'],
  },
  {
    stage: 3,
    title: 'Chặng 3: Vòng lặp & Luồng điều khiển',
    level: 'Cơ bản',
    description: 'Tự động hóa các thao tác xử lý hàng nghìn dữ liệu lặp lại với vòng lặp for (range) và while.',
    topicId: 3,
    skills: ['Vòng lặp for & range()', 'Vòng lặp while', 'Lệnh break & continue', 'Xử lý vòng lặp lồng nhau'],
  },
  {
    stage: 4,
    title: 'Chặng 4: Chuỗi ký tự & Xử lý văn bản',
    level: 'Cơ bản',
    description: 'Thành thạo kỹ thuật cắt chuỗi (slicing), định dạng f-string hiện đại và các phương thức xử lý chuỗi thực chiến.',
    topicId: 4,
    skills: ['Chỉ mục & Slicing [::-1]', 'Định dạng f-string', 'split(), join(), strip()', 'Thuật toán Palindrome'],
  },
  {
    stage: 5,
    title: 'Chặng 5: Cấu trúc dữ liệu Danh sách (List & Tuple)',
    level: 'Trung cấp',
    description: 'Tổ chức dữ liệu có thứ tự, các thao tác thêm sửa xóa và tuyệt kỹ List Comprehension 1 dòng mã.',
    topicId: 5,
    skills: ['append, insert, pop, remove', 'sort() & sorted()', 'List Comprehension', 'Tuple & Unpacking'],
  },
  {
    stage: 6,
    title: 'Chặng 6: Từ điển (Dictionary) & Tập hợp (Set)',
    level: 'Trung cấp',
    description: 'Truy xuất dữ liệu siêu tốc theo cặp Key-Value và loại bỏ phần tử trùng lặp với Set.',
    topicId: 6,
    skills: ['Key-Value mapping', 'Truy xuất an toàn với get()', 'Duyệt keys(), values(), items()', 'Set operations: &, |, -'],
  },
  {
    stage: 7,
    title: 'Chặng 7: Lập trình Mô-đun & Hàm (Functions)',
    level: 'Trung cấp',
    description: 'Tái sử dụng mã nguồn, chia nhỏ bài toán phức tạp, hiểu sâu về Scope biến và hàm vô danh Lambda.',
    topicId: 7,
    skills: ['Định nghĩa def & return', 'Tham số mặc định & *args', 'Biến Local vs Global', 'Hàm ẩn danh Lambda'],
  },
  {
    stage: 8,
    title: 'Chặng 8: Hướng đối tượng (OOP) & Xử lý Ngoại lệ',
    level: 'Nâng cao',
    description: 'Tư duy lập trình hướng đối tượng chuyên nghiệp với Class, Object, Kế thừa và bảo vệ ứng dụng bằng try-except.',
    topicId: 8,
    skills: ['Class, Object & __init__', 'Từ khóa self & Phương thức', 'Kế thừa (Inheritance)', 'Khối lệnh try - except - finally'],
  },
];

export default function Roadmap() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    statsApi.me().then(setStats);
  }, []);

  const getTopicProgress = (topicId) => {
    if (!stats || !stats.byTopic) return { done: 0, total: 1, percent: 0 };
    const t = stats.byTopic.find((x) => x.topicId === topicId);
    if (!t) return { done: 0, total: 1, percent: 0 };
    const pct = Math.round((t.done / (t.total || 1)) * 100);
    return { done: t.done, total: t.total, percent: pct };
  };

  return (
    <div className="roadmap-page">
      <div className="roadmap-header between">
        <div>
          <h1>🗺️ Lộ trình Học Lập trình Python Chuẩn Chỉnh</h1>
          <p className="muted">
            Lộ trình từ con số 0 đến lập trình viên tự tin làm chủ tư duy giải thuật, cấu trúc dữ liệu và hướng đối tượng.
          </p>
        </div>
        {stats && (
          <div className="card roadmap-summary">
            <span className="small">Tổng quan tiến độ:</span>
            <div className="roadmap-pct">
              {Math.round((stats.completed / (stats.totalExercises || 1)) * 100)}%
            </div>
            <span className="muted small">
              {stats.completed}/{stats.totalExercises} bài tập hoàn thành
            </span>
          </div>
        )}
      </div>

      <div className="roadmap-timeline">
        {ROADMAP_STAGES.map((s, idx) => {
          const prog = getTopicProgress(s.topicId);
          const isCompleted = prog.percent === 100;
          const isInProgress = prog.percent > 0 && prog.percent < 100;

          return (
            <div key={s.stage} className={`roadmap-node ${isCompleted ? 'node-done' : isInProgress ? 'node-active' : ''}`}>
              <div className="node-marker">
                <span className="node-num">{isCompleted ? '✓' : s.stage}</span>
                {idx < ROADMAP_STAGES.length - 1 && <div className="node-line"></div>}
              </div>

              <div className="card node-card">
                <div className="between node-top">
                  <div>
                    <span className="badge badge-primary">{s.level}</span>
                    <h2 className="node-title">{s.title}</h2>
                  </div>
                  <div className="node-badge">
                    {isCompleted ? (
                      <span className="badge badge-success">✓ Đã chinh phục</span>
                    ) : isInProgress ? (
                      <span className="badge badge-warn">Đang tiến hành ({prog.percent}%)</span>
                    ) : (
                      <span className="badge badge-neutral">Sẵn sàng học</span>
                    )}
                  </div>
                </div>

                <p className="node-desc">{s.description}</p>

                <div className="node-skills">
                  <span className="small muted">Kỹ năng đạt được:</span>
                  <div className="skills-tags">
                    {s.skills.map((sk, i) => (
                      <span key={i} className="skill-tag">
                        • {sk}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="node-footer between">
                  <div className="node-prog-bar">
                    <div className="prog-text small muted">
                      Tiến độ bài tập: {prog.done}/{prog.total} ({prog.percent}%)
                    </div>
                    <div className="progress">
                      <div className="progress-fill" style={{ width: `${prog.percent}%` }}></div>
                    </div>
                  </div>

                  <Link to={`/topics`} className="btn small-btn">
                    {isCompleted ? 'Ôn lại chủ đề' : 'Bắt đầu học ngay →'}
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
