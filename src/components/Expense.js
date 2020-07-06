import React from "react";

const Expense = ({ expense }) => {
  console.log(expense);
  return (
    <div>
      <h4>$ {expense.amount}</h4>
      <h5>{expense.entity.name}</h5>
      <p>{expense.category}</p>
    </div>
  );
};

export default Expense;
