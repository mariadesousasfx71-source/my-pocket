import { useNavigate } from "react-router-dom";
import ExpenseForm from "../components/ExpenseForm";

function AddExpense({ onAdd }) {
  const navigate = useNavigate();

  function handleSave(data) {
    onAdd(data);
    navigate("/expenses"); // go to the list after adding
  }

  return (
    <ExpenseForm
      heading="Add Expense"
      buttonLabel="Add Expense"
      onSubmit={handleSave}
    />
  );
}

export default AddExpense;
