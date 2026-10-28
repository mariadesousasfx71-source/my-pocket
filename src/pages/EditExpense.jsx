import { useParams, useNavigate, Link } from "react-router-dom";
import ExpenseForm from "../components/ExpenseForm";

function EditExpense({ expenses, onUpdate }) {
  const { id } = useParams(); // the id from the address, e.g. /edit/1729761540000
  const navigate = useNavigate();

  // The id in the address is text, so convert it to a number before comparing
  const expense = expenses.find((e) => e.id === Number(id));

  if (!expense) {
    return (
      <div className="text-center mt-16 space-y-3">
        <p className="text-stone-600">This expense could not be found.</p>
        <Link to="/expenses" className="text-[#7A4318] font-medium hover:underline">
          Back to all expenses
        </Link>
      </div>
    );
  }

  function handleSave(data) {
    onUpdate(expense.id, data);
    navigate("/expenses");
  }

  return (
    <ExpenseForm
      initial={expense}
      heading="Edit Expense"
      buttonLabel="Save Changes"
      onSubmit={handleSave}
    />
  );
}

export default EditExpense;
