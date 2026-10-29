import TransactionsContext from "./TransactionsContext";
import useLocalStorage from "../hooks/useLocalStorage";
import useAuth from "../hooks/useAuth";

// Wraps the whole app, so every page can use the same data.
//
// Each person has their own data. It is saved under a key that includes the
// person's name, e.g. "transactions:maria" and "budget:maria", so someone who
// logs in as "Rahul" never sees Maria's records.
function TransactionsProvider({ children }) {
  const { user } = useAuth();

  // "Maria " and "maria" count as the same person
  const userId = user ? user.name.trim().toLowerCase() : "guest";

  // key={userId} makes React start fresh when a different person logs in,
  // so it reads that person's saved data instead of keeping the last person's.
  return (
    <UserData key={userId} userId={userId}>
      {children}
    </UserData>
  );
}

// Holds the transactions and budget of ONE person
function UserData({ userId, children }) {
  const [transactions, setTransactions] = useLocalStorage(`transactions:${userId}`, []);
  const [budget, setBudget] = useLocalStorage(`budget:${userId}`, 0);

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
