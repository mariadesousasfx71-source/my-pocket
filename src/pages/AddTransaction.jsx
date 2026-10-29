import { useNavigate } from "react-router-dom";
import TransactionForm from "../components/TransactionForm";
import useTransactions from "../hooks/useTransactions";
import { spentThisMonth, availableBalance } from "../utils/budget";

function AddTransaction() {
  const { transactions, addTransaction, budget } = useTransactions();
  const navigate = useNavigate();

  function handleSave(data) {
    addTransaction(data);
    navigate("/transactions"); // go to the list after adding
  }

  return (
    <TransactionForm
      heading="Add Transaction"
      buttonLabel="Add Transaction"
      onSubmit={handleSave}
      budget={budget}
      spentSoFar={spentThisMonth(transactions)}
      available={availableBalance(transactions)}
    />
  );
}

export default AddTransaction;
