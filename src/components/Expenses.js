import React, { Component } from "react";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import BootstrapTable from "react-bootstrap-table-next";
import filterFactory, {
  dateFilter,
  selectFilter,
} from "react-bootstrap-table2-filter";
import cellEditFactory, { Type } from "react-bootstrap-table2-editor";
import paginationFactory from "react-bootstrap-table2-paginator";
import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles } from "@material-ui/core/styles";

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
    // formatter: dateFormatter,
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
        return <span className="badge badge-success"> TRUE </span>;
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
  debugger;
  let d = new Date(cell);
  const ye = new Intl.DateTimeFormat("en", { year: "numeric" }).format(d);
  const mo = new Intl.DateTimeFormat("en", { month: "short" }).format(d);
  const da = new Intl.DateTimeFormat("en", { day: "2-digit" }).format(d);

  return `${da}-${mo}-${ye}`;
}
function priceFormatter(cell, row) {
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

const useStyles = makeStyles((theme) => ({
  root: {
    "& > * + *": {
      marginLeft: theme.spacing(2),
    },
  },
}));

const Expenses = ({ expenses, onEdit, loading }) => {
  const classes = useStyles();
  function afterSaveCell(oldValue, newValue, row, column, done) {
    onEdit(row);
  }

  return (
    <>
      {loading ? (
        <CircularProgress className={classes.root} />
      ) : (
        <BootstrapTable
          color="primary.main"
          striped
          condensed
          hover
          keyField="id"
          data={expenses}
          filter={filterFactory()}
          cellEdit={cellEditFactory({
            mode: "click",
            blurToSave: true,
            afterSaveCell,
          })}
          pagination={paginationFactory()}
          columns={columns}
        />
      )}
    </>
  );
};

export default Expenses;
