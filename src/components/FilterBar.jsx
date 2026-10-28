import Card from "./Card";
import { inputStyle } from "../utils/styles";
import { monthLabel } from "../utils/formatDate";

// The search box and drop-downs on the Transactions page.
// The filter values live in the parent page (state is "lifted up"):
// this component only shows them and reports changes with onChange.
function FilterBar({
  filters,
  onChange,
  onClear,
  categoryOptions,
  titleOptions,
  monthOptions,
  shown,
  total,
}) {
  const isFiltering =
    filters.search !== "" ||
    filters.type !== "All" ||
    filters.category !== "All" ||
    filters.month !== "All";

  return (
    <Card className="p-4 space-y-3">
      {/* One search box: click it to pick one of your titles from the
          drop-down, or type any word from a title or note */}
      <input
        type="search"
        list="search-titles"
        value={filters.search}
        onChange={(e) => onChange("search", e.target.value)}
        placeholder="Search or pick a title"
        className={inputStyle}
      />
      <datalist id="search-titles">
        {titleOptions.map((t) => (
          <option key={t} value={t} />
        ))}
      </datalist>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <select
          value={filters.type}
          onChange={(e) => onChange("type", e.target.value)}
          className={inputStyle}
          aria-label="Filter by type"
        >
          <option value="All">Income and expenses</option>
          <option value="expense">Expenses only</option>
          <option value="income">Income only</option>
        </select>

        <select
          value={filters.category}
          onChange={(e) => onChange("category", e.target.value)}
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
          value={filters.month}
          onChange={(e) => onChange("month", e.target.value)}
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

        <select
          value={filters.sort}
          onChange={(e) => onChange("sort", e.target.value)}
          className={inputStyle}
          aria-label="Sort by"
        >
          <option value="newest">Newest first</option>
          <option value="oldest">Oldest first</option>
          <option value="amount-high">Amount: high to low</option>
          <option value="amount-low">Amount: low to high</option>
        </select>
      </div>

      {isFiltering && (
        <div className="flex justify-between items-center text-sm">
          <span className="text-stone-600">
            Showing {shown} of {total}
          </span>
          <button onClick={onClear} className="text-[#7A4318] font-medium hover:underline">
            Clear filters
          </button>
        </div>
      )}
    </Card>
  );
}

export default FilterBar;
