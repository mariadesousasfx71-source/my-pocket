import { useState } from "react";
import Card from "../components/Card";
import StatBox from "../components/StatBox";
import ProgressBar from "../components/ProgressBar";
import EmptyState from "../components/EmptyState";
import useTransactions from "../hooks/useTransactions";
import { formatMoney } from "../utils/formatMoney";
import { currentMonth, monthLabel } from "../utils/formatDate";
import { inputStyle } from "../utils/styles";

// Groups a list by category and adds up each one, biggest first:
// [["Food", 1650], ["Bills", 799], ...]
function totalsByCategory(list) {
  const totals = list.reduce((acc, t) => {
    acc[t.category] = (acc[t.category] || 0) + t.amount;
    return acc;
  }, {});
  return Object.entries(totals).toSorted((a, b) => b[1] - a[1]);
}

// One "category breakdown" card, with a bar and percentage per category
function Breakdown({ heading, rows, total, colour, emptyText }) {
  return (
    <Card className="p-5">
      <h3 className="font-semibold mb-4">{heading}</h3>
      {rows.length === 0 ? (
        <p className="text-sm text-stone-600">{emptyText}</p>
      ) : (
        <ul className="space-y-3">
          {rows.map(([category, amount]) => {
            const percent = Math.round((amount / total) * 100);
            return (
              <li key={category}>
                <div className="flex justify-between text-sm mb-1">
                  <span>{category}</span>
                  <span className="font-medium">
                    {formatMoney(amount)} · {percent}%
                  </span>
                </div>
                <ProgressBar percent={percent} colour={colour} />
              </li>
            );
          })}
        </ul>
      )}
    </Card>
  );
}

function Reports() {
  const { transactions } = useTransactions();
  const [month, setMonth] = useState(currentMonth());

  if (transactions.length === 0) {
    return (
      <EmptyState
        message="Reports will appear once you add some transactions."
        actionLabel="Add a transaction"
        actionTo="/add"
      />
    );
  }

  // Months to choose from: every month with data, plus this month
  const months = [
    ...new Set([currentMonth(), ...transactions.map((t) => t.date.slice(0, 7))]),
  ]
    .toSorted()
    .toReversed();

  const list =
    month === "All" ? transactions : transactions.filter((t) => t.date.startsWith(month));

  const expenses = list.filter((t) => t.type === "expense");
  const income = list.filter((t) => t.type === "income");
  const totalExpense = expenses.reduce((sum, t) => sum + t.amount, 0);
  const totalIncome = income.reduce((sum, t) => sum + t.amount, 0);
  const saved = totalIncome - totalExpense;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
        <h2 className="text-2xl font-semibold text-[#3B2416]">Reports</h2>
        <select
          value={month}
          onChange={(e) => setMonth(e.target.value)}
          className={`${inputStyle} sm:w-56`}
          aria-label="Choose a month"
        >
          {months.map((m) => (
            <option key={m} value={m}>
              {monthLabel(m)}
            </option>
          ))}
          <option value="All">All time</option>
        </select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center sm:text-left">
        <StatBox label="Income" value={formatMoney(totalIncome)} tone="income" />
        <StatBox label="Expenses" value={formatMoney(totalExpense)} tone="expense" />
        <StatBox
          label={saved < 0 ? "Overspent" : "Saved"}
          value={formatMoney(Math.abs(saved))}
          tone={saved < 0 ? "expense" : "default"}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Breakdown
          heading="Spending by category"
          rows={totalsByCategory(expenses)}
          total={totalExpense}
          colour="bg-[#9A5A2C]"
          emptyText="No expenses in this period."
        />
        <Breakdown
          heading="Income by category"
          rows={totalsByCategory(income)}
          total={totalIncome}
          colour="bg-green-700"
          emptyText="No income in this period."
        />
      </div>
    </div>
  );
}

export default Reports;
