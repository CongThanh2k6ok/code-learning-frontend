export default function ProgressBar({ value, total }) {
  const pct = total ? Math.round((value / total) * 100) : 0;
  return (
    <div className="progress" title={`${value}/${total}`}>
      <div className="progress-fill" style={{ width: `${pct}%` }} />
    </div>
  );
}
