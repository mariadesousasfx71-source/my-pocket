import Logo from "./Logo";

// Each falling coin: how far it drifts sideways, and when it starts
const fallingCoins = [
  { drift: -4, delay: 0 },
  { drift: 10, delay: 0.35 },
  { drift: -14, delay: 0.7 },
  { drift: 6, delay: 1.05 },
  { drift: -8, delay: 1.4 },
];

// Coins already lying in the pile at the bottom
const pileCoins = [
  { left: 8, bottom: 0 },
  { left: 32, bottom: 0 },
  { left: 56, bottom: 0 },
  { left: 20, bottom: 14 },
  { left: 44, bottom: 14 },
];

// The pouch sways while ₹ coins slip out of a hole in the bottom
function CoinsAnimation() {
  return (
    <div className="relative w-56 h-72" aria-hidden="true">
      {/* swaying pouch */}
      <div className="absolute left-1/2 top-0 -ml-[70px]">
        <div className="pouch-sway">
          <Logo size={140} />
        </div>
      </div>

      {/* falling coins */}
      {fallingCoins.map((c, i) => (
        <span
          key={i}
          className="coin coin-fall absolute left-[99px] top-[118px]"
          style={{ "--drift": `${c.drift}px`, animationDelay: `${c.delay}s` }}
        >
          ₹
        </span>
      ))}

      {/* the pile of coins on the ground */}
      <div className="absolute bottom-3 left-1/2 -ml-[45px] w-[90px] h-[34px]">
        {pileCoins.map((c, i) => (
          <span
            key={i}
            className="coin absolute"
            style={{ left: c.left, bottom: c.bottom }}
          >
            ₹
          </span>
        ))}
      </div>
    </div>
  );
}

export default CoinsAnimation;
