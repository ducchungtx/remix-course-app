// /expenses

import { Link, Outlet } from '@remix-run/react';
import { FaDownload, FaPlus } from 'react-icons/fa';

import ExpensesList from '~/components/expenses/ExpensesList';

const DUMMY_EXPENSES = [
  {
    id: "e1",
    title: "Toilet Paper",
    amount: 94.12,
    date: new Date(2020, 7, 14).toISOString(),
  },
  {
    id: "e2",
    title: "New TV",
    amount: 799.49,
    date: new Date(2021, 2, 12).toISOString(),
  },
  {
    id: "e3",
    title: "Car Insurance",
    amount: 294.67,
    date: new Date(2021, 2, 28).toISOString(),
  },
  {
    id: "e4",
    title: "New Desk (Wooden)",
    amount: 450,
    date: new Date(2021, 5, 12).toISOString(),
  },
];

export default function ExpensesLayout() {
  return (
    <>
      <Outlet />
      <main>
        <section id='expenses-actions'>
          <Link to="add">
            <FaPlus />
            <span>Add Expanse</span>
          </Link>
          <a href="/expense/raw">
            <FaDownload />
            <span>Load Raw Data</span>
          </a>
        </section>
        <ExpensesList expenses={DUMMY_EXPENSES} />
      </main>
    </>
  );
}
