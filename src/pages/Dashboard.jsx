import { Link } from "react-router-dom";
import { formatMoney } from "../utils/formatMoney";
import { formatDate } from "../utils/formatDate";
import LogoBadge from "../components/LogoBadge";

function Dashboard({ expenses }) {
  // "2026-10" — the year and month of today, to find this month's expenses
  const thisMonth = new Date().toLocaleDateString("en-CA").slice(0, 7);

  // 1. Totals
  const total = expenses.reduce((sum, e) => sum + e.amount, 0);
  const monthExpenses = expenses.filter((e) => e.date.startsWith(thisMonth));
  const monthTotal = monthExpenses.reduce((sum, e) => sum + e.amount, 0);

  // 2. Total per category, e.g. { Food: 1650, Bills: 799 }
  const byCategory = expenses.reduce((totals, e) => {
    totals[e.category] = (totals[e.category] || 0) + e.amount;
    return totals;
  }, {});

  // Turn it into a list, biggest first: [["Food", 1650], ["Bills", 799]]
  const categoryList = Object.entries(byCategory).toSorted((a, b) => b[1] - a[1]);
  const biggest = categoryList.length > 0 ? categoryList[0][1] : 0;

  // 3. The five most recent expenses
  const recent = expenses
    .toSorted((a, b) => b.date.localeCompare(a.date))
    .slice(0, 5);

  if (expenses.length === 0) {
    return (
      <div className="flex flex-col items-center text-center mt-12 space-y-4">
        <LogoBadge size={160} />
        <h2 className="text-3xl font-bold text-[#4A2C1A]">
          Welcome to <span className="font-brand text-5xl">My Pocket</span>
        </h2>
        <p className="text-stone-600">Add your first expense to see your summary here.</p>
        <Link
          to="/add"
          className="inline-block bg-[#4A2C1A] hover:bg-[#3A2214] text-amber-50 border border-[#2E1A0E] shadow-md hover:shadow-lg transition rounded-lg px-4 py-2"
        >
          Add an expense
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Welcome banner with the logo */}
      <div className="flex flex-col sm:flex-row items-center text-center sm:text-left gap-6 bg-[#F3E3CC] border border-[#D9B98F] rounded-xl shadow-md p-6">
        <LogoBadge size={120} />
        <div>
          <h2 className="font-brand text-5xl text-[#4A2C1A]">My Pocket</h2>
          <p className="mt-1 text-lg sm:text-xl font-semibold text-[#7A4318] tracking-wide">
            Every rupee, in one place.
          </p>
        </div>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center sm:text-left">
        <div className="bg-[#F3E3CC] border border-[#D9B98F] rounded-xl shadow-md p-5">
          <p className="text-sm text-stone-500">This month</p>
          <p className="text-2xl font-bold text-[#4A2C1A]">{formatMoney(monthTotal)}</p>
        </div>
        <div className="bg-[#F3E3CC] border border-[#D9B98F] rounded-xl shadow-md p-5">
          <p className="text-sm text-stone-500">All time</p>
          <p className="text-2xl font-bold text-stone-800">{formatMoney(total)}</p>
        </div>
        <div className="bg-[#F3E3CC] border border-[#D9B98F] rounded-xl shadow-md p-5">
          <p className="text-sm text-stone-500">Expenses recorded</p>
          <p className="text-2xl font-bold text-stone-800">{expenses.length}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Spending by category */}
        <div className="bg-[#F3E3CC] border border-[#D9B98F] rounded-xl shadow-md p-5">
          <h3 className="font-semibold mb-4 text-center sm:text-left">Spending by category</h3>
          <ul className="space-y-3">
            {categoryList.map(([category, amount]) => (
              <li key={category}>
                <div className="flex justify-between text-sm mb-1">
                  <span>{category}</span>
                  <span className="font-medium">{formatMoney(amount)}</span>
                </div>
                <div className="h-2 bg-[#E2C49C] rounded-full">
                  <div
                    className="h-2 bg-[#7A4318] rounded-full"
                    style={{ width: `${(amount / biggest) * 100}%` }}
                  />
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Recent expenses */}
        <div className="bg-[#F3E3CC] border border-[#D9B98F] rounded-xl shadow-md p-5">
          <div className="flex justify-between items-baseline mb-4">
            <h3 className="font-semibold">Recent expenses</h3>
            <Link to="/expenses" className="text-sm text-[#7A4318] font-medium hover:underline">
              See all
            </Link>
          </div>
          <ul className="divide-y divide-[#D9B98F]">
            {recent.map((e) => (
              <li key={e.id} className="flex justify-between py-2">
                <div>
                  <p className="font-medium">{e.title}</p>
                  <p className="text-xs text-stone-500">
                    {e.category} · {formatDate(e.date)}
                  </p>
                </div>
                <span className="font-semibold">{formatMoney(e.amount)}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
