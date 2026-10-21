import React, { useMemo } from 'react';

/**
 * Biểu đồ hoạt động đóng góp dạng lưới GitHub (365 ngày)
 * Tạo ra ma trận ngày học tập với các mức độ màu sắc dựa trên streak và bài hoàn thành
 */
export default function ActivityHeatmap({ streak = 5, totalContributions = 186 }) {
  // Sinh dữ liệu mẫu cho 52 tuần gần nhất
  const weeks = useMemo(() => {
    const today = new Date();
    const result = [];
    
    // Tạo 52 tuần, mỗi tuần 7 ngày (0: Chủ nhật, ..., 6: Thứ bảy)
    for (let w = 51; w >= 0; w--) {
      const days = [];
      for (let d = 0; d < 7; d++) {
        const date = new Date(today);
        date.setDate(today.getDate() - (w * 7 + (6 - d)));
        
        // Tính toán ngẫu nhiên có trọng số: các ngày gần đây nếu có streak thì mức độ cao
        const daysAgo = w * 7 + (6 - d);
        let level = 0;
        let count = 0;

        if (daysAgo <= streak) {
          level = Math.floor(Math.random() * 2) + 3; // level 3-4
          count = Math.floor(Math.random() * 4) + 4;
        } else if (daysAgo < 180) {
          const rand = Math.random();
          if (rand > 0.45) {
            level = Math.floor(Math.random() * 3) + 1;
            count = level * 2;
          }
        } else {
          if (Math.random() > 0.7) {
            level = 1;
            count = 1;
          }
        }

        days.push({
          dateStr: date.toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' }),
          level,
          count,
        });
      }
      result.push(days);
    }
    return result;
  }, [streak]);

  const months = ['Th1', 'Th2', 'Th3', 'Th4', 'Th5', 'Th6', 'Th7', 'Th8', 'Th9', 'Th10', 'Th11', 'Th12'];

  return (
    <div className="activity-heatmap-wrap card">
      <div className="between heatmap-head">
        <div>
          <h3 className="heatmap-title">📊 Nhật Ký Hoạt Động Lập Trình (Activity Heatmap)</h3>
          <p className="small muted">
            Ghi nhận mọi lượt gõ code, giải bài tập và thách đấu trong suốt 365 ngày qua.
          </p>
        </div>
        <div className="total-contrib-badge">
          <b>{totalContributions + streak * 3}</b> hoạt động trong năm
        </div>
      </div>

      <div className="heatmap-scroll-area">
        <div className="heatmap-grid-inner">
          <div className="heatmap-weekday-labels">
            <span>T2</span>
            <span>T4</span>
            <span>T6</span>
          </div>

          <div className="heatmap-weeks">
            {weeks.map((week, wIdx) => (
              <div key={wIdx} className="heatmap-col">
                {week.map((day, dIdx) => (
                  <div
                    key={dIdx}
                    className={`heatmap-cell level-${day.level}`}
                    title={`${day.dateStr}: ${day.count > 0 ? `${day.count} bài nộp & hoạt động` : 'Không có hoạt động'}`}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="between heatmap-footer">
        <span className="small muted">🔥 Chuỗi học liên tục hiện tại: <b>{streak} ngày</b></span>
        <div className="heatmap-legend">
          <span className="small muted">Ít</span>
          <span className="heatmap-cell level-0" />
          <span className="heatmap-cell level-1" />
          <span className="heatmap-cell level-2" />
          <span className="heatmap-cell level-3" />
          <span className="heatmap-cell level-4" />
          <span className="small muted">Nhiều</span>
        </div>
      </div>
    </div>
  );
}
