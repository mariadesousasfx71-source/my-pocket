import { useState, useRef } from "react";
import Card from "./Card";
import Modal from "./Modal";
import BudgetAlert from "./BudgetAlert";
import { formatDate, toIsoDate, currentMonth } from "../utils/formatDate";
import { titleOptions, categoriesFor } from "../utils/categories";
import { inputStyle } from "../utils/styles";
import { formatMoney } from "../utils/formatMoney";

// One form used by both the Add and Edit pages.
// - initial:     an existing transaction to start from (Edit), or nothing (Add)
// - heading:     the title shown at the top of the form
// - buttonLabel: the text on the submit button
// - onSubmit:    what to do with the checked data
// - budget:      the monthly budget (0 if none), so the form can warn you
// - spentSoFar:  this month's expenses, not counting the one on this form
// - available:   money you have now (income minus expenses). An expense bigger
//                than this is refused with a pop-up.
function TransactionForm({
  initial,
  heading,
  buttonLabel,
  onSubmit,
  budget = 0,
  spentSoFar = 0,
  available = Infinity,
}) {
  const today = new Date().toLocaleDateString("en-CA");
  const startType = initial ? initial.type : "expense";

  const [type, setType] = useState(startType);
  const [category, setCategory] = useState(
    initial ? initial.category : categoriesFor(startType)[0]
  );
  const [title, setTitle] = useState(initial ? initial.title : "");
  const [amount, setAmount] = useState(initial ? String(initial.amount) : "");
  const [date, setDate] = useState(formatDate(initial ? initial.date : today));
  const [note, setNote] = useState(initial ? initial.note || "" : "");
  const [error, setError] = useState("");
  const [noBalanceMessage, setNoBalanceMessage] = useState(""); // pop-up text, "" = hidden
  const calendarRef = useRef(null); // the hidden calendar input

  // Suggested titles for the chosen type and category
  const suggestions = titleOptions[type][category] || [];

  // "Type my own" mode: on when the title isn't one of the suggestions
  const [customTitle, setCustomTitle] = useState(
    initial ? !suggestions.includes(initial.title) : false
  );

  // Budget warning: only for an expense dated this month. Adds the amount
  // being typed to what is already spent, so you see the effect before saving.
  const typedAmount = Number(amount) > 0 ? Number(amount) : 0;
  const countsThisMonth = type === "expense" && (toIsoDate(date) || "").startsWith(currentMonth());
  const spentAfter = spentSoFar + (countsThisMonth ? typedAmount : 0);

  function handleTypeChange(newType) {
    setType(newType);
    setCategory(categoriesFor(newType)[0]); // income and expense have different categories
    setTitle("");
    setCustomTitle(false);
  }

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
    // You can't spend money you don't have: show a pop-up and don't save
    if (type === "expense" && value > available) {
      setNoBalanceMessage(
        available > 0
          ? `You only have ${formatMoney(available)} available, but this expense is ${formatMoney(value)}.`
          : "You don't have any money available. Add some income first."
      );
      return;
    }

    onSubmit({
      type,
      title: title.trim(),
      amount: value,
      category,
      date: isoDate,
      note: note.trim(),
    });
  }

  return (
    <Card className="max-w-md mx-auto p-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        <h2 className="text-2xl font-semibold text-center">{heading}</h2>

        {error && <p className="text-red-600 text-sm">{error}</p>}

        {/* Expense / Income switch */}
        <div className="grid grid-cols-2 gap-1 p-1 bg-[#EAD9BF] rounded-lg">
          {["expense", "income"].map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => handleTypeChange(option)}
              className={`py-2 rounded-md font-semibold transition ${
                type === option
                  ? option === "expense"
                    ? "bg-[#3B2416] text-amber-50 shadow"
                    : "bg-green-800 text-white shadow"
                  : "text-[#3B2416] hover:bg-[#DCC6A4]"
              }`}
            >
              {option === "expense" ? "Expense" : "Income"}
            </button>
          ))}
        </div>

        <label className="block">
          <span className="text-sm text-stone-600">Category</span>
          <select
            value={category}
            onChange={(e) => handleCategoryChange(e.target.value)}
            className={`mt-1 ${inputStyle}`}
          >
            {categoriesFor(type).map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
        </label>

        <label className="block">
          <span className="text-sm text-stone-600">Title</span>
          <select
            value={customTitle ? "custom" : title}
            onChange={(e) => handleTitlePick(e.target.value)}
            className={`mt-1 ${inputStyle}`}
          >
            <option value="" disabled>
              Choose a title
            </option>
            {suggestions.map((t) => (
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
            className={inputStyle}
          />
        )}

        <label className="block">
          <span className="text-sm text-stone-600">Amount (₹)</span>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="e.g. 450"
            className={`mt-1 ${inputStyle}`}
          />
        </label>

        <div>
          <label htmlFor="transaction-date" className="text-sm text-stone-600">
            Date (DD-MM-YYYY)
          </label>
          <div className="relative mt-1">
            {/* You can type the date here... */}
            <input
              id="transaction-date"
              type="text"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              placeholder="DD-MM-YYYY"
              maxLength={10}
              className={`${inputStyle} pr-12`}
            />

            {/* ...or click this button to pick it from a calendar */}
            <button
              type="button"
              onClick={() => calendarRef.current.showPicker()}
              aria-label="Open calendar"
              title="Pick a date"
              className="absolute right-1.5 top-1/2 -translate-y-1/2 p-1.5 rounded-md text-[#3B2416] hover:bg-[#EAD9BF]"
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

        <label className="block">
          <span className="text-sm text-stone-600">Note (optional)</span>
          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="e.g. Weekly vegetables from the market"
            rows={2}
            maxLength={120}
            className={`mt-1 ${inputStyle} resize-none`}
          />
        </label>

        {/* Warns at 80% of the monthly budget, before you save */}
        <BudgetAlert spent={spentAfter} budget={budget} preview />

        <button
          type="submit"
          className="w-full bg-[#3B2416] hover:bg-[#2A190F] text-amber-50 border border-[#24150C] shadow-md hover:shadow-lg transition font-semibold rounded-lg py-2"
        >
          {buttonLabel}
        </button>
      </form>
      {noBalanceMessage && (
        <Modal
          title="You don't have enough balance"
          confirmLabel="OK"
          hideCancel
          onConfirm={() => setNoBalanceMessage("")}
          onCancel={() => setNoBalanceMessage("")}
        >
          <p>{noBalanceMessage}</p>
        </Modal>
      )}
    </Card>
  );
}

export default TransactionForm;
