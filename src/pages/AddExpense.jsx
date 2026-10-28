import { useState } from "react";
import { useNavigate } from "react-router-dom";
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

function AddExpense({ onAdd }) {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("Food");
  const [date, setDate] = useState(
    formatDate(new Date().toLocaleDateString("en-CA"))
  );
  const [error, setError] = useState("");
  const navigate = useNavigate();

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

    onAdd({ title: title.trim(), amount: value, category, date: isoDate });
    navigate("/expenses"); // go to the list after adding
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto bg-[#F3E3CC] border border-[#D9B98F] rounded-xl shadow-md p-6 space-y-4"
    >
      <h2 className="text-2xl font-semibold text-center">Add Expense</h2>

      {error && <p className="text-red-600 text-sm">{error}</p>}

      <label className="block">
        <span className="text-sm text-stone-600">Category</span>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="mt-1 w-full bg-[#FFF8EE] border border-[#D9B98F] focus:outline-none focus:ring-2 focus:ring-[#C8955F] rounded-lg px-3 py-2"
        >
          {categories.map((c) => (
            <option key={c}>{c}</option>
          ))}
        </select>
      </label>

      <label className="block">
        <span className="text-sm text-stone-600">Title</span>
        <input
          list="title-options"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Pick a suggestion or type your own"
          className="mt-1 w-full bg-[#FFF8EE] border border-[#D9B98F] focus:outline-none focus:ring-2 focus:ring-[#C8955F] rounded-lg px-3 py-2"
        />
        <datalist id="title-options">
          {titleOptions[category].map((t) => (
            <option key={t} value={t} />
          ))}
        </datalist>
      </label>

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


      <label className="block">
        <span className="text-sm text-stone-600">Date (DD-MM-YYYY)</span>
        <input
          type="text"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          placeholder="DD-MM-YYYY"
          maxLength={10}
          className="mt-1 w-full bg-[#FFF8EE] border border-[#D9B98F] focus:outline-none focus:ring-2 focus:ring-[#C8955F] rounded-lg px-3 py-2"
        />
      </label>

      <button
        type="submit"
        className="w-full bg-[#4A2C1A] hover:bg-[#3A2214] text-amber-50 border border-[#2E1A0E] shadow-md hover:shadow-lg transition font-semibold rounded-lg py-2"
      >
        Add Expense
      </button>
    </form>
  );
}

export default AddExpense;
