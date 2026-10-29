import { formatMoney } from "../utils/formatMoney";

// Warns when this month's spending reaches 80% of the budget (or goes over).
// Shows nothing if there's no budget or spending is still under 80%.
// preview: true is used on the Add/Edit form, where the expense is not saved
// yet, so the wording says what WILL happen.
function BudgetAlert({ spent, budget, preview = false }) {
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
        {preview
          ? isOver
            ? "This expense will put you over this month's budget!"
            : "This expense will take you close to your budget."
          : isOver
            ? "You've gone over this month's budget!"
            : "Careful, you're close to your budget."}
      </p>
      <p className="text-sm mt-1">
        {preview ? "You'll have spent" : "You've spent"} {formatMoney(spent)} of your{" "}
        {formatMoney(budget)} budget ({percent}%).
      </p>
    </div>
  );
}

export default BudgetAlert;
