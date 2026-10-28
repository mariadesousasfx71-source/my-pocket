// The ivory box with the chocolate stripe on the left, used everywhere.
// Pass extra classes (like padding) with className.
function Card({ children, className = "" }) {
  return (
    <div
      className={`bg-[#F3E6D3] border border-[#CFA97A] border-l-[6px] border-l-[#3B2416] rounded-xl shadow-md ${className}`}
    >
      {children}
    </div>
  );
}

export default Card;
