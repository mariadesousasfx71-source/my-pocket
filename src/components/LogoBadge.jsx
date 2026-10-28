import Logo from "./Logo";

// The pouch logo inside a cream-coloured circle.
// `size` is the width/height of the whole circle in pixels.
function LogoBadge({ size = 64 }) {
  return (
    <div
      className="flex items-center justify-center rounded-full bg-[#F5E1C3] ring-4 ring-[#C8955F] shadow-md shrink-0"
      style={{ width: size, height: size }}
    >
      <Logo size={size * 0.8} />
    </div>
  );
}

export default LogoBadge;
