import React, { Component } from "react";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import BootstrapTable from "react-bootstrap-table-next";
import filterFactory, {
  dateFilter,
  selectFilter,
} from "react-bootstrap-table2-filter";
import cellEditFactory, { Type } from "react-bootstrap-table2-editor";

const columns = [
  {
    dataField: "id",
    text: "Expense ID",
    hidden: true,
  },
  {
    dataField: "date",
    text: "Date",
    filter: dateFilter(),
    formatter: dateFormatter,
  },
  {
    dataField: "amount",
    text: "Amount",
    sort: true,
    formatter: priceFormatter,
  },
  {
    dataField: "entity.name",
    text: "Name",
  },
  {
    dataField: "category",
    text: "Category",
  },
  {
    dataField: "donation",
    text: "Donation",
    sort: true,
    formatter: (cellContent, row) => {
      if (cellContent) {
        return <span className="badge badge-primary"> TRUE </span>;
      }
      return <span className="badge badge-warning"> FALSE </span>;
    },
    editor: {
      type: Type.SELECT,
      options: [
        {
          value: "true",
          label: "true",
        },
        {
          value: "false",
          label: "false",
        },
      ],
    },
  },
];

function dateFormatter(cell) {
  let d = new Date(cell);
  const ye = new Intl.DateTimeFormat("en", { year: "numeric" }).format(d);
  const mo = new Intl.DateTimeFormat("en", { month: "short" }).format(d);
  const da = new Intl.DateTimeFormat("en", { day: "2-digit" }).format(d);

  return `${da}-${mo}-${ye}`;
}
function priceFormatter(cell, row) {
  console.log(row);
  if (cell < 0) {
    return (
      <span>
        <strong style={{ color: "red" }}>$ {cell} </strong>
      </span>
    );
  } else {
    return <strong style={{ color: "green" }}>$ {cell} </strong>;
  }
}

const Expenses = ({ expenses, onEdit }) => {
  function afterSaveCell(oldValue, newValue, row, column, done) {
    onEdit(row);
  }
  console.log(expenses);
  return (
    <div>
      <BootstrapTable
        striped
        hover
        keyField="id"
        data={expenses}
        filter={filterFactory()}
        cellEdit={cellEditFactory({
          mode: "click",
          blurToSave: true,
          afterSaveCell,
        })}
        columns={columns}
      />
    </div>
  );
};

export default Expenses;
