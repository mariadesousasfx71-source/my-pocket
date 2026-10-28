import { useNavigate } from "react-router-dom";
import TransactionForm from "../components/TransactionForm";
import useTransactions from "../hooks/useTransactions";

function AddTransaction() {
  const { addTransaction } = useTransactions();
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
    />
  );
}

export default AddTransaction;
