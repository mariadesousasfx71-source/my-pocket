import TransactionsContext from "./TransactionsContext";
import useLocalStorage from "../hooks/useLocalStorage";

// Before income was added, the app saved a list called "expenses" with no
// type or note. This turns those old expenses into the new format, so no
// data is lost. It only runs if there are no saved "transactions" yet.
function loadOldExpenses() {
  try {
    const old = JSON.parse(localStorage.getItem("expenses")) || [];
    return old.map((e) => ({ ...e, type: "expense", note: e.note || "" }));
  } catch {
    return [];
  }
}

// Wraps the whole app, so every page can use the same data
function TransactionsProvider({ children }) {
  const [transactions, setTransactions] = useLocalStorage("transactions", loadOldExpenses);
  const [budget, setBudget] = useLocalStorage("budget", 0);

  function addTransaction(data) {
    setTransactions([...transactions, { id: Date.now(), ...data }]);
  }

  function updateTransaction(id, changes) {
    setTransactions(transactions.map((t) => (t.id === id ? { ...t, ...changes } : t)));
  }

  function deleteTransaction(id) {
    setTransactions(transactions.filter((t) => t.id !== id));
  }

  const value = {
    transactions,
    addTransaction,
    updateTransaction,
    deleteTransaction,
    budget,
    setBudget,
  };

  return (
    <TransactionsContext.Provider value={value}>{children}</TransactionsContext.Provider>
  );
}

export default TransactionsProvider;
