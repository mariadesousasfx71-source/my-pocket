import { useParams, useNavigate } from "react-router-dom";
import TransactionForm from "../components/TransactionForm";
import EmptyState from "../components/EmptyState";
import useTransactions from "../hooks/useTransactions";
import { spentThisMonth } from "../utils/budget";

function EditTransaction() {
  const { transactions, updateTransaction, budget } = useTransactions();
  const { id } = useParams(); // the id from the address, e.g. /edit/1729761540000
  const navigate = useNavigate();

  // The id in the address is text, so convert it to a number before comparing
  const transaction = transactions.find((t) => t.id === Number(id));

  if (!transaction) {
    return (
      <EmptyState
        message="This transaction could not be found."
        actionLabel="Back to transactions"
        actionTo="/transactions"
      />
    );
  }

  function handleSave(data) {
    updateTransaction(transaction.id, data);
    navigate("/transactions");
  }

  return (
    <TransactionForm
      initial={transaction}
      heading="Edit Transaction"
      buttonLabel="Save Changes"
      onSubmit={handleSave}
      budget={budget}
      spentSoFar={spentThisMonth(transactions, transaction.id)}
    />
  );
}

export default EditTransaction;
