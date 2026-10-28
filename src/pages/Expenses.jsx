import { Link } from "react-router-dom";
import { formatMoney } from "../utils/formatMoney";
import { formatDate } from "../utils/formatDate";

function Expenses({ expenses, onDelete }) {
  if (expenses.length === 0) {
    return (
      <div className="text-center mt-16 space-y-3">
        <p className="text-stone-600">No expenses yet.</p>
        <Link
          to="/add"
          className="inline-block bg-[#4A2C1A] hover:bg-[#3A2214] text-amber-50 border border-[#2E1A0E] shadow-md hover:shadow-lg transition rounded-lg px-4 py-2"
        >
          Add your first expense
        </Link>
      </div>
    );
  }

  const total = expenses.reduce((sum, e) => sum + e.amount, 0);
  const sorted = expenses.toSorted((a, b) => b.date.localeCompare(a.date));

  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex flex-col sm:flex-row items-center sm:items-baseline justify-between gap-1 mb-4 text-center">
        <h2 className="text-2xl font-semibold">All Expenses</h2>
        <p className="text-stone-600">
          Total:{" "}
          <span className="font-bold text-[#4A2C1A]">{formatMoney(total)}</span>
        </p>
      </div>

      <ul className="space-y-2">
        {sorted.map((e) => (
          <li
            key={e.id}
            className="flex flex-col sm:flex-row items-center sm:justify-between gap-2 text-center sm:text-left bg-[#F3E3CC] border border-[#D9B98F] rounded-lg shadow-md px-4 py-3"
          >
            <div>
              <p className="font-medium">{e.title}</p>
              <p className="text-sm text-stone-500">
                {e.category} · {formatDate(e.date)}
              </p>
            </div>
            <div className="flex items-center gap-4">
              <span className="font-semibold">{formatMoney(e.amount)}</span>
              <button
                onClick={() => onDelete(e.id)}
                className="text-sm text-red-600 hover:underline"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Expenses;
