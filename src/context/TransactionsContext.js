import { createContext } from "react";

// The shared "box" that holds all transactions and the budget.
// TransactionsProvider fills it; useTransactions() reads it.
const TransactionsContext = createContext(null);

export default TransactionsContext;
