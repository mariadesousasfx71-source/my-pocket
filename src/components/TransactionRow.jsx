import { Link } from "react-router-dom";
import { formatMoney } from "../utils/formatMoney";
import { formatDate } from "../utils/formatDate";

// One transaction: title, category, date, note and amount.
// If onDelete is given, Edit and Delete links are shown too.
function TransactionRow({ transaction, onDelete }) {
  const t = transaction;
  const isIncome = t.type === "income";

  return (
    <div className="flex flex-col sm:flex-row items-center sm:justify-between gap-2 text-center sm:text-left">
      <div>
        <p className="font-medium">{t.title}</p>
        <p className="text-sm text-stone-500">
          {t.category} · {formatDate(t.date)}
        </p>
        {t.note && <p className="text-sm text-stone-600 italic mt-0.5">"{t.note}"</p>}
      </div>

      <div className="flex items-center gap-4">
        <span className={`font-semibold ${isIncome ? "text-green-700" : "text-red-700"}`}>
          {isIncome ? "+" : "−"}
          {formatMoney(t.amount)}
        </span>

        {onDelete && (
          <>
            <Link
              to={`/edit/${t.id}`}
              className="text-sm text-[#7A4318] font-medium hover:underline"
            >
              Edit
            </Link>
            <button
              onClick={() => onDelete(t.id)}
              className="text-sm text-red-600 hover:underline"
            >
              Delete
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default TransactionRow;
