import { Link } from "react-router-dom";
import LogoBadge from "./LogoBadge";
import { buttonStyle } from "../utils/styles";

// Shown instead of a blank screen when there's nothing to list yet
function EmptyState({ message, actionLabel, actionTo }) {
  return (
    <div className="flex flex-col items-center text-center mt-12 space-y-4">
      <LogoBadge size={110} />
      <p className="text-lg text-stone-600">{message}</p>
      {actionTo && (
        <Link to={actionTo} className={buttonStyle}>
          {actionLabel}
        </Link>
      )}
    </div>
  );
}

export default EmptyState;
