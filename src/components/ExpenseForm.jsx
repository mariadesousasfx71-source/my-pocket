import { useState, useRef } from "react";
import { formatDate, toIsoDate } from "../utils/formatDate";

// Suggested titles for each category (shown as drop-down options)
const titleOptions = {
  Food: ["Groceries", "Vegetables", "Fruits", "Milk", "Restaurant", "Snacks", "Tea / Coffee"],
  Travel: ["Bus fare", "Train ticket", "Auto / Taxi", "Petrol", "Flight"],
  Bills: ["Electricity bill", "Water bill", "Mobile recharge", "Internet bill", "Rent", "Gas cylinder"],
  Shopping: ["Clothes", "Shoes", "Electronics", "Household items", "Gifts"],
  Health: ["Medicines", "Doctor visit", "Lab tests", "Gym"],
  Other: ["Books", "Course fees", "Entertainment", "Donation", "Miscellaneous"],
};

// The category names come from the object above: ["Food", "Travel", ...]
const categories = Object.keys(titleOptions);

// One form used by both the Add and Edit pages.
// - initial:     an existing expense to start from (Edit), or nothing (Add)
// - heading:     the title shown at the top of the form
// - buttonLabel: the text on the submit button
// - onSubmit:    what to do with the checked data
function ExpenseForm({ initial, heading, buttonLabel, onSubmit }) {
  const today = new Date().toLocaleDateString("en-CA");

  const [title, setTitle] = useState(initial ? initial.title : "");
  const [amount, setAmount] = useState(initial ? String(initial.amount) : "");
  const [category, setCategory] = useState(initial ? initial.category : "Food");
  const [date, setDate] = useState(formatDate(initial ? initial.date : today));
  const [error, setError] = useState("");
  const calendarRef = useRef(null); // the hidden calendar input

  // "Type my own" mode: on when the title isn't one of the suggestions
  const [customTitle, setCustomTitle] = useState(
    initial ? !titleOptions[initial.category].includes(initial.title) : false
  );

  function handleCategoryChange(newCategory) {
    setCategory(newCategory);
    // A suggested title belongs to the old category, so clear it
    if (!customTitle) setTitle("");
  }

  function handleTitlePick(choice) {
    if (choice === "custom") {
      setCustomTitle(true);
      setTitle("");
    } else {
      setCustomTitle(false);
      setTitle(choice);
    }
  }

  function handleSubmit(e) {
    e.preventDefault(); // stop the page from reloading

    const value = Number(amount);
    const isoDate = toIsoDate(date);

    if (title.trim() === "" || isNaN(value) || value <= 0) {
      setError("Please enter a title and an amount above 0.");
      return;
    }
    if (!isoDate) {
      setError("Please enter a valid date as DD-MM-YYYY.");
      return;
    }

    onSubmit({ title: title.trim(), amount: value, category, date: isoDate });
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto bg-[#F3E3CC] border border-[#D9B98F] rounded-xl shadow-md p-6 space-y-4"
    >
      <h2 className="text-2xl font-semibold text-center">{heading}</h2>

      {error && <p className="text-red-600 text-sm">{error}</p>}

      <label className="block">
        <span className="text-sm text-stone-600">Category</span>
        <select
          value={category}
          onChange={(e) => handleCategoryChange(e.target.value)}
          className="mt-1 w-full bg-[#FFF8EE] border border-[#D9B98F] focus:outline-none focus:ring-2 focus:ring-[#C8955F] rounded-lg px-3 py-2"
        >
          {categories.map((c) => (
            <option key={c}>{c}</option>
          ))}
        </select>
      </label>

      <label className="block">
        <span className="text-sm text-stone-600">Title</span>
        <select
          value={customTitle ? "custom" : title}
          onChange={(e) => handleTitlePick(e.target.value)}
          className="mt-1 w-full bg-[#FFF8EE] border border-[#D9B98F] focus:outline-none focus:ring-2 focus:ring-[#C8955F] rounded-lg px-3 py-2"
        >
          <option value="" disabled>
            Choose a title
          </option>
          {titleOptions[category].map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
          <option value="custom">Other (type your own)</option>
        </select>
      </label>

      {/* Only shown when "Other (type your own)" is chosen */}
      {customTitle && (
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Type your own title"
          autoFocus
          className="w-full bg-[#FFF8EE] border border-[#D9B98F] focus:outline-none focus:ring-2 focus:ring-[#C8955F] rounded-lg px-3 py-2"
        />
      )}

      <label className="block">
        <span className="text-sm text-stone-600">Amount (₹)</span>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="e.g. 450"
          className="mt-1 w-full bg-[#FFF8EE] border border-[#D9B98F] focus:outline-none focus:ring-2 focus:ring-[#C8955F] rounded-lg px-3 py-2"
        />
      </label>


      <div>
        <label htmlFor="expense-date" className="text-sm text-stone-600">
          Date (DD-MM-YYYY)
        </label>
        <div className="relative mt-1">
          {/* You can type the date here... */}
          <input
            id="expense-date"
            type="text"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            placeholder="DD-MM-YYYY"
            maxLength={10}
            className="w-full bg-[#FFF8EE] border border-[#D9B98F] focus:outline-none focus:ring-2 focus:ring-[#C8955F] rounded-lg pl-3 pr-12 py-2"
          />

          {/* ...or click this button to pick it from a calendar */}
          <button
            type="button"
            onClick={() => calendarRef.current.showPicker()}
            aria-label="Open calendar"
            title="Pick a date"
            className="absolute right-1.5 top-1/2 -translate-y-1/2 p-1.5 rounded-md text-[#4A2C1A] hover:bg-[#F3E3CC]"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="5" width="18" height="16" rx="2" />
              <path d="M3 10h18M8 3v4M16 3v4" />
              <path d="M8 14h2M14 14h2M8 18h2" />
            </svg>
          </button>

          {/* Hidden browser calendar. It works in YYYY-MM-DD,
              so we convert to and from DD-MM-YYYY. */}
          <input
            ref={calendarRef}
            type="date"
            tabIndex={-1}
            aria-hidden="true"
            value={toIsoDate(date) ?? ""}
            onChange={(e) => {
              if (e.target.value) setDate(formatDate(e.target.value));
            }}
            className="absolute right-2 bottom-0 w-px h-px opacity-0 pointer-events-none"
          />
        </div>
      </div>

      <button
        type="submit"
        className="w-full bg-[#4A2C1A] hover:bg-[#3A2214] text-amber-50 border border-[#2E1A0E] shadow-md hover:shadow-lg transition font-semibold rounded-lg py-2"
      >
        {buttonLabel}
      </button>
    </form>
  );
}

export default ExpenseForm;
