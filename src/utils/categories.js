// Categories for each type of transaction, with suggested titles for each category
export const titleOptions = {
  expense: {
    Food: ["Groceries", "Vegetables", "Fruits", "Milk", "Restaurant", "Snacks", "Tea / Coffee"],
    Travel: ["Bus fare", "Train ticket", "Auto / Taxi", "Petrol", "Flight"],
    Bills: ["Electricity bill", "Water bill", "Mobile recharge", "Internet bill", "Rent", "Gas cylinder"],
    Shopping: ["Clothes", "Shoes", "Electronics", "Household items", "Gifts"],
    Health: ["Medicines", "Doctor visit", "Lab tests", "Gym"],
    Other: ["Books", "Course fees", "Entertainment", "Donation", "Miscellaneous"],
  },
  income: {
    Salary: ["Salary", "Bonus"],
    Freelance: ["Project payment", "Tuition fees", "Consulting"],
    Gifts: ["Birthday gift", "Festival gift"],
    Interest: ["Bank interest", "FD interest"],
    Refunds: ["Refund", "Cashback"],
    "Other income": ["Rent received", "Sold an item", "Miscellaneous"],
  },
};

// categoriesFor("expense") → ["Food", "Travel", "Bills", ...]
export function categoriesFor(type) {
  return Object.keys(titleOptions[type]);
}
