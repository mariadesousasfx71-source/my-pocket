import { useContext } from "react";
import TransactionsContext from "../context/TransactionsContext";

// Custom hook: any component can call useTransactions() to get the
// transactions, the budget, and the functions that change them.
function useTransactions() {
  const context = useContext(TransactionsContext);
  if (!context) {
    throw new Error("useTransactions must be used inside <TransactionsProvider>");
  }
  return context;
}

export default useTransactions;
