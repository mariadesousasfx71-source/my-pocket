import { useState } from "react";
import Card from "../components/Card";
import ProgressBar from "../components/ProgressBar";
import BudgetAlert from "../components/BudgetAlert";
import useTransactions from "../hooks/useTransactions";
import { formatMoney } from "../utils/formatMoney";
import { currentMonth } from "../utils/formatDate";
import { inputStyle, buttonStyle } from "../utils/styles";

function Settings() {
  const { transactions, budget, setBudget } = useTransactions();
  const [input, setInput] = useState(budget > 0 ? String(budget) : "");
  const [message, setMessage] = useState(null); // { text, isError }

  const spent = transactions
    .filter((t) => t.type === "expense" && t.date.startsWith(currentMonth()))
    .reduce((sum, t) => sum + t.amount, 0);
  const used = budget > 0 ? Math.round((spent / budget) * 100) : 0;
  const barColour = used >= 100 ? "bg-red-600" : used >= 80 ? "bg-amber-500" : "bg-[#9A5A2C]";

  function handleSave(e) {
    e.preventDefault();
    const value = Number(input);
    if (input.trim() === "" || isNaN(value) || value <= 0) {
      setMessage({ text: "Please enter a budget above 0.", isError: true });
      return;
    }
    setBudget(value);
    setMessage({ text: "Budget saved.", isError: false });
  }

  function handleRemove() {
    setBudget(0);
    setInput("");
    setMessage({ text: "Budget removed.", isError: false });
  }

  return (
    <div className="max-w-md mx-auto space-y-6">
      <h2 className="text-2xl font-semibold text-center text-[#3B2416]">Settings</h2>

      <Card className="p-6">
        <form onSubmit={handleSave} className="space-y-4">
          <div>
            <h3 className="font-semibold">Monthly budget</h3>
            <p className="text-sm text-stone-600">
              You'll get a warning on the Dashboard when your spending reaches 80% of this
              amount.
            </p>
          </div>

          <label className="block">
            <span className="text-sm text-stone-600">Budget per month (₹)</span>
            <input
              type="number"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="e.g. 15000"
              className={`mt-1 ${inputStyle}`}
            />
          </label>

          {message && (
            <p className={`text-sm ${message.isError ? "text-red-600" : "text-green-700"}`}>
              {message.text}
            </p>
          )}

          <div className="flex gap-3">
            <button type="submit" className={`${buttonStyle} flex-1`}>
              Save budget
            </button>
            {budget > 0 && (
              <button
                type="button"
                onClick={handleRemove}
                className="px-4 py-2 rounded-lg border border-[#D9B98F] text-[#3B2416] hover:bg-[#EAD9BF]"
              >
                Remove
              </button>
            )}
          </div>
        </form>
      </Card>

      {budget > 0 && (
        <Card className="p-6 space-y-3">
          <h3 className="font-semibold">This month so far</h3>
          <p className="text-sm text-stone-600">
            {formatMoney(spent)} spent of {formatMoney(budget)}
          </p>
          <ProgressBar percent={used} colour={barColour} />
          <p className="text-sm font-medium text-[#3B2416]">{used}% used</p>
        </Card>
      )}

      <BudgetAlert spent={spent} budget={budget} />
    </div>
  );
}

export default Settings;
