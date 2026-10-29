import { currentMonth } from "./formatDate";

// How much has been spent on expenses this month.
// skipId lets the Edit page leave out the transaction being edited, because
// its new amount is added separately.
export function spentThisMonth(transactions, skipId) {
  return transactions
    .filter(
      (t) => t.type === "expense" && t.id !== skipId && t.date.startsWith(currentMonth())
    )
    .reduce((sum, t) => sum + t.amount, 0);
}
