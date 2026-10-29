import { Link } from "react-router-dom";
import Card from "../components/Card";
import LogoBadge from "../components/LogoBadge";
import StatBox from "../components/StatBox";
import ProgressBar from "../components/ProgressBar";
import BudgetAlert from "../components/BudgetAlert";
import CurrencyCard from "../components/CurrencyCard";
import TransactionRow from "../components/TransactionRow";
import useTransactions from "../hooks/useTransactions";
import { formatMoney } from "../utils/formatMoney";
import { currentMonth } from "../utils/formatDate";
import { buttonStyle } from "../utils/styles";

// Adds up the amounts of one type ("income" or "expense") in a list
function totalOf(list, type) {
  return list.filter((t) => t.type === type).reduce((sum, t) => sum + t.amount, 0);
}

function Dashboard() {
  const { transactions, budget } = useTransactions();

  if (transactions.length === 0) {
    return (
      <div className="flex flex-col items-center text-center mt-12 space-y-4">
        <LogoBadge size={160} />
        <h2 className="text-3xl font-bold text-[#3B2416]">
          Welcome to <span className="font-brand text-5xl">My Pocket</span>
        </h2>
        <p className="text-[#3B2416] font-medium">
          Add your first transaction to see your summary here.
        </p>
        <Link to="/add" className={buttonStyle}>
          Add a transaction
        </Link>
      </div>
    );
  }

  // 1. Balance: all income minus all expenses
  const balance = totalOf(transactions, "income") - totalOf(transactions, "expense");

  // Zero balance: income and expenses cancel out exactly.
  // (Math.abs(...) < 0.005 avoids tiny rounding errors with paise.)
  const isZeroBalance = Math.abs(balance) < 0.005;

  // 2. This month's income and expenses
  const thisMonth = transactions.filter((t) => t.date.startsWith(currentMonth()));
  const monthIncome = totalOf(thisMonth, "income");
  const monthExpense = totalOf(thisMonth, "expense");

  // 3. Budget used this month, as a percentage
  const budgetUsed = budget > 0 ? Math.round((monthExpense / budget) * 100) : 0;
  const barColour =
    budgetUsed >= 100 ? "bg-red-600" : budgetUsed >= 80 ? "bg-amber-500" : "bg-[#9A5A2C]";

  // 4. The five most recent transactions
  const recent = transactions
    .toSorted((a, b) => b.date.localeCompare(a.date))
    .slice(0, 5);

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Welcome banner with the logo */}
      <Card className="p-6 flex flex-col sm:flex-row items-center text-center sm:text-left gap-6">
        <LogoBadge size={120} />
        <div>
          <h2 className="font-brand text-5xl text-[#3B2416]">My Pocket</h2>
          <p className="mt-1 text-lg sm:text-xl font-semibold text-[#9A5A2C] tracking-wide">
            Every rupee, in one place.
          </p>
        </div>
      </Card>

      <BudgetAlert spent={monthExpense} budget={budget} />

      {isZeroBalance && (
        <div
          role="alert"
          className="rounded-xl border border-l-[6px] border-amber-300 border-l-amber-600 bg-amber-50 px-5 py-4 text-amber-900 shadow-md"
        >
          <p className="font-semibold">Zero Balance</p>
          <p className="text-sm mt-1">
            Your income and expenses are equal, so you have {formatMoney(0)} left.
          </p>
        </div>
      )}

      {/* Summary cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center sm:text-left">
        <StatBox
          label="Balance"
          value={(balance < 0 ? "−" : "") + formatMoney(Math.abs(balance))}
          tone={balance < 0 ? "expense" : "default"}
        />
        <StatBox label="Income this month" value={formatMoney(monthIncome)} tone="income" />
        <StatBox label="Expenses this month" value={formatMoney(monthExpense)} tone="expense" />
      </div>

      {/* Live exchange rates (Frankfurter API) */}
      <CurrencyCard balance={balance} />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Monthly budget */}
        <Card className="p-5 space-y-3">
          <h3 className="font-semibold">Monthly budget</h3>
          {budget > 0 ? (
            <>
              <p className="text-sm text-stone-600">
                {formatMoney(monthExpense)} spent of {formatMoney(budget)}
              </p>
              <ProgressBar percent={budgetUsed} colour={barColour} />
              <p className="text-sm font-medium text-[#3B2416]">{budgetUsed}% used</p>
            </>
          ) : (
            <p className="text-sm text-stone-600">
              No budget set yet.{" "}
              <Link to="/settings" className="text-[#9A5A2C] font-medium hover:underline">
                Set one in Settings
              </Link>
            </p>
          )}
        </Card>

        {/* Recent transactions */}
        <Card className="p-5">
          <div className="flex justify-between items-baseline mb-3">
            <h3 className="font-semibold">Recent transactions</h3>
            <Link to="/transactions" className="text-sm text-[#9A5A2C] font-medium hover:underline">
              See all
            </Link>
          </div>
          <ul className="divide-y divide-[#E2C49C]">
            {recent.map((t) => (
              <li key={t.id} className="py-2">
                <TransactionRow transaction={t} />
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </div>
  );
}

export default Dashboard;
