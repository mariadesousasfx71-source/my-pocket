import { useState } from "react";
import Card from "../components/Card";
import EmptyState from "../components/EmptyState";
import FilterBar from "../components/FilterBar";
import TransactionRow from "../components/TransactionRow";
import useTransactions from "../hooks/useTransactions";
import { formatMoney } from "../utils/formatMoney";

const startingFilters = {
  search: "",
  type: "All",
  category: "All",
  month: "All",
  sort: "newest",
};

function Transactions() {
  const { transactions, deleteTransaction } = useTransactions();

  // Lifting state up: the filter values live here, in the page,
  // and FilterBar (the child) changes them through updateFilter.
  const [filters, setFilters] = useState(startingFilters);

  function updateFilter(field, value) {
    setFilters({ ...filters, [field]: value });
  }

  if (transactions.length === 0) {
    return (
      <EmptyState
        message="No transactions yet. Add your first one!"
        actionLabel="Add a transaction"
        actionTo="/add"
      />
    );
  }

  // Drop-down options built from the data you actually have.
  // A Set keeps only unique values; [... ] turns it back into an array.
  const categoryOptions = [...new Set(transactions.map((t) => t.category))].toSorted();
  // Titles you've used. If a category is chosen, only that category's titles.
  const titleOptions = [
    ...new Set(
      transactions
        .filter((t) => filters.category === "All" || t.category === filters.category)
        .map((t) => t.title)
    ),
  ].toSorted();
  const monthOptions = [...new Set(transactions.map((t) => t.date.slice(0, 7)))]
    .toSorted()
    .toReversed(); // newest month first

  // Keep only the transactions that match every filter
  const search = filters.search.trim().toLowerCase();
  const filtered = transactions.filter((t) => {
    const matchesSearch =
      t.title.toLowerCase().includes(search) ||
      (t.note || "").toLowerCase().includes(search);
    const matchesType = filters.type === "All" || t.type === filters.type;
    const matchesCategory = filters.category === "All" || t.category === filters.category;
    const matchesMonth = filters.month === "All" || t.date.startsWith(filters.month);
    return matchesSearch && matchesType && matchesCategory && matchesMonth;
  });

  // Sort a copy (toSorted never changes the original list)
  const sorted = filtered.toSorted((a, b) => {
    if (filters.sort === "oldest") return a.date.localeCompare(b.date);
    if (filters.sort === "amount-high") return b.amount - a.amount;
    if (filters.sort === "amount-low") return a.amount - b.amount;
    return b.date.localeCompare(a.date); // newest first
  });

  const moneyIn = filtered
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);
  const moneyOut = filtered
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);

  return (
    <div className="max-w-2xl mx-auto space-y-4">
      <div className="flex flex-col sm:flex-row items-center sm:items-baseline justify-between gap-1 text-center">
        <h2 className="text-2xl font-semibold text-[#3B2416]">Transactions</h2>
        <p className="text-[#3B2416]">
          In <span className="font-bold text-green-800">{formatMoney(moneyIn)}</span>
          {" · "}
          Out <span className="font-bold text-red-700">{formatMoney(moneyOut)}</span>
        </p>
      </div>

      <FilterBar
        filters={filters}
        onChange={updateFilter}
        onClear={() => setFilters(startingFilters)}
        categoryOptions={categoryOptions}
        titleOptions={titleOptions}
        monthOptions={monthOptions}
        shown={filtered.length}
        total={transactions.length}
      />

      {sorted.length === 0 ? (
        <p className="text-center text-[#3B2416] font-medium mt-8">
          No transactions match your search.
        </p>
      ) : (
        <ul className="space-y-2">
          {sorted.map((t) => (
            <li key={t.id}>
              <Card className="px-4 py-3">
                <TransactionRow transaction={t} onDelete={deleteTransaction} />
              </Card>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Transactions;
