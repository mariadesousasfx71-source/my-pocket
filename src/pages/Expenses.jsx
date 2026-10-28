import { useState } from "react";
import { Link } from "react-router-dom";
import { formatMoney } from "../utils/formatMoney";
import { formatDate } from "../utils/formatDate";

// "2026-10" → "October 2026"
function monthLabel(yearMonth) {
  return new Date(`${yearMonth}-01`).toLocaleDateString("en-IN", {
    month: "long",
    year: "numeric",
  });
}

const inputStyle =
  "w-full bg-[#FFF8EE] border border-[#D9B98F] focus:outline-none focus:ring-2 focus:ring-[#C8955F] rounded-lg px-3 py-2";

function Expenses({ expenses, onDelete }) {
  // Hooks must come before any early "return"
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [month, setMonth] = useState("All");

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

  // Options for the drop-downs, built from the expenses you actually have.
  // A Set keeps only unique values; [... ] turns it back into an array.
  const categoryOptions = [...new Set(expenses.map((e) => e.category))].toSorted();
  const monthOptions = [...new Set(expenses.map((e) => e.date.slice(0, 7)))]
    .toSorted()
    .toReversed(); // newest month first

  // Keep only the expenses that match all three filters
  const filtered = expenses.filter((e) => {
    const matchesSearch = e.title.toLowerCase().includes(search.trim().toLowerCase());
    const matchesCategory = category === "All" || e.category === category;
    const matchesMonth = month === "All" || e.date.startsWith(month);
    return matchesSearch && matchesCategory && matchesMonth;
  });

  const total = filtered.reduce((sum, e) => sum + e.amount, 0);
  const sorted = filtered.toSorted((a, b) => b.date.localeCompare(a.date));
  const isFiltering = search !== "" || category !== "All" || month !== "All";

  function clearFilters() {
    setSearch("");
    setCategory("All");
    setMonth("All");
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex flex-col sm:flex-row items-center sm:items-baseline justify-between gap-1 mb-4 text-center">
        <h2 className="text-2xl font-semibold">All Expenses</h2>
        <p className="text-stone-600">
          Total:{" "}
          <span className="font-bold text-[#4A2C1A]">{formatMoney(total)}</span>
        </p>
      </div>

      {/* Search and filters */}
      <div className="bg-[#F3E3CC] border border-[#D9B98F] rounded-xl shadow-md p-4 mb-4 space-y-3">
        <input
          type="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by title, e.g. milk"
          className={inputStyle}
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className={inputStyle}
            aria-label="Filter by category"
          >
            <option value="All">All categories</option>
            {categoryOptions.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
          <select
            value={month}
            onChange={(e) => setMonth(e.target.value)}
            className={inputStyle}
            aria-label="Filter by month"
          >
            <option value="All">All months</option>
            {monthOptions.map((m) => (
              <option key={m} value={m}>
                {monthLabel(m)}
              </option>
            ))}
          </select>
        </div>
        {isFiltering && (
          <div className="flex justify-between items-center text-sm">
            <span className="text-stone-600">
              Showing {filtered.length} of {expenses.length}
            </span>
            <button
              onClick={clearFilters}
              className="text-[#7A4318] font-medium hover:underline"
            >
              Clear filters
            </button>
          </div>
        )}
      </div>

      {sorted.length === 0 ? (
        <p className="text-center text-stone-600 mt-8">
          No expenses match your search.
        </p>
      ) : (
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
                <Link
                  to={`/edit/${e.id}`}
                  className="text-sm text-[#7A4318] font-medium hover:underline"
                >
                  Edit
                </Link>
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
      )}
    </div>
  );
}

export default Expenses;
