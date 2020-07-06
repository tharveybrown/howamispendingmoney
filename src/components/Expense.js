import React from "react";

const Expense = ({ expense }) => {
  console.log(expense);
  return (
    <div>
      <h4>{expense.amount}</h4>
      <p>{expense.entity.name}</p>
    </div>
  );
};

export default Expense;
