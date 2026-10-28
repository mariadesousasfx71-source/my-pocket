import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import Expenses from "./pages/Expenses";
import AddExpense from "./pages/AddExpense";

function App() {
  // Load saved expenses once, when the app starts
  const [expenses, setExpenses] = useState(() => {
    const saved = localStorage.getItem("expenses");
    return saved ? JSON.parse(saved) : [];
  });

  // Save to localStorage every time the list changes
  useEffect(() => {
    localStorage.setItem("expenses", JSON.stringify(expenses));
  }, [expenses]);

  function addExpense(expense) {
    setExpenses([...expenses, { id: Date.now(), ...expense }]);
  }

  function deleteExpense(id) {
    setExpenses(expenses.filter((e) => e.id !== id));
  }

  return (
    <div className="min-h-screen bg-[#F6EADB] bg-[url('/doodle.svg')] bg-repeat">
      <Navbar />
      <main className="px-4 py-6 sm:p-8">
        <Routes>
          <Route path="/" element={<Dashboard expenses={expenses} />} />
          <Route
            path="/expenses"
            element={<Expenses expenses={expenses} onDelete={deleteExpense} />}
          />
          <Route path="/add" element={<AddExpense onAdd={addExpense} />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;