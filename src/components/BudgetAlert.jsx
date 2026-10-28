import { formatMoney } from "../utils/formatMoney";

// Warns when this month's spending reaches 80% of the budget (or goes over).
// Shows nothing if there's no budget or spending is still under 80%.
function BudgetAlert({ spent, budget }) {
  if (!budget) return null;

  const percent = Math.round((spent / budget) * 100);
  if (percent < 80) return null;

  const isOver = percent >= 100;

  return (
    <div
      role="alert"
      className={`rounded-xl border-l-[6px] px-5 py-4 shadow-md ${
        isOver
          ? "bg-red-50 border border-red-300 border-l-red-700 text-red-800"
          : "bg-amber-50 border border-amber-300 border-l-amber-600 text-amber-900"
      }`}
    >
      <p className="font-semibold">
        {isOver ? "You've gone over this month's budget!" : "Careful, you're close to your budget."}
      </p>
      <p className="text-sm mt-1">
        You've spent {formatMoney(spent)} of your {formatMoney(budget)} budget ({percent}%).
      </p>
    </div>
  );
}

export default BudgetAlert;
