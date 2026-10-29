import { useState } from "react";
import Card from "../components/Card";
import EmptyState from "../components/EmptyState";
import FilterBar from "../components/FilterBar";
import TransactionRow from "../components/TransactionRow";
import useTransactions from "../hooks/useTransactions";

const startingFilters = {
  search: "",
  type: "All",
  category: "All",
  month: "All",
  sort: "newest", // newest or oldest (by date)
  amountSort: "", // "", "high" or "low": only used if you pick it under More filters
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
    if (filters.amountSort === "high") return b.amount - a.amount;
    if (filters.amountSort === "low") return a.amount - b.amount;
    if (filters.sort === "oldest") return a.date.localeCompare(b.date);
    return b.date.localeCompare(a.date); // newest first
  });

  return (
    <div className="max-w-2xl mx-auto space-y-4">
      <h2 className="text-2xl font-semibold text-center sm:text-left text-[#3B2416]">
        Transactions
      </h2>

      <FilterBar
        filters={filters}
        onChange={updateFilter}
        onClear={() => setFilters(startingFilters)}
        categoryOptions={categoryOptions}
        titleOptions={titleOptions}
        monthOptions={monthOptions}
      />

      {sorted.length === 0 ? (
        <p className="text-center text-[#3B2416] font-medium mt-8">
          No transactions match these filters.
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
