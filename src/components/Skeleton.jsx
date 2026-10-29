// A grey placeholder bar that gently pulses while data is loading.
// Size it with className, e.g. <Skeleton className="h-6 w-32" />
function Skeleton({ className = "" }) {
  return <div className={`animate-pulse rounded-md bg-[#E2C49C] ${className}`} />;
}

export default Skeleton;
