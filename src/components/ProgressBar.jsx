// A horizontal bar filled to `percent` (anything over 100 is shown as full)
function ProgressBar({ percent, colour = "bg-[#7A4318]" }) {
  const width = Math.min(Math.max(percent, 0), 100);

  return (
    <div className="h-2.5 bg-[#E2C49C] rounded-full overflow-hidden">
      <div className={`h-full rounded-full ${colour}`} style={{ width: `${width}%` }} />
    </div>
  );
}

export default ProgressBar;
