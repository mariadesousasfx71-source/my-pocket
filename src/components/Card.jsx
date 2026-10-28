// The ivory box with the chocolate stripe on the left, used everywhere.
// Pass extra classes (like padding) with className.
function Card({ children, className = "" }) {
  return (
    <div
      className={`bg-[#FCF6EE] border border-[#D9B98F] border-l-[6px] border-l-[#3B2416] rounded-xl shadow-md ${className}`}
    >
      {children}
    </div>
  );
}

export default Card;
