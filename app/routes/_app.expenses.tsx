// /expenses

import { Link, Outlet, json, useLoaderData } from '@remix-run/react';
import { FaDownload, FaPlus } from 'react-icons/fa';

import ExpensesList from '~/components/expenses/ExpensesList';
import { getExpenses } from '~/data/expenses.server';

export default function ExpensesLayout() {
  const { expenses } = useLoaderData<{ expenses: [] }>();

  return (
    <>
      <Outlet />
      <main>
        <section id="expenses-actions">
          <Link to="add">
            <FaPlus />
            <span>Add Expense</span>
          </Link>
          <a href="/expenses/raw">
            <FaDownload />
            <span>Load Raw Data</span>
          </a>
        </section>
        <ExpensesList expenses={expenses} />
      </main>
    </>
  );
}

export const loader = async () => {
  const expenses = await getExpenses();
  if (!expenses || expenses.length === 0) {
    throw json(
      { message: 'No expenses found' },
      { status: 404, statusText: 'No expenses found' }
    );
  }
  return json({ expenses });
};
