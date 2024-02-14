// /expenses

import { Link, Outlet, useLoaderData } from '@remix-run/react';
import { FaDownload, FaPlus } from 'react-icons/fa';

import ExpensesList from '~/components/expenses/ExpensesList';
import { getExpenses } from '~/data/expenses.server';

export default function ExpensesLayout() {
  const { expenses } = useLoaderData<{ expenses: any[] }>();
  console.log('expenses', expenses);
  return (
    <>
      <Outlet />
      <main>
        <section id="expenses-actions">
          <Link to="add">
            <FaPlus />
            <span>Add Expanse</span>
          </Link>
          <a href="/expense/raw">
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
  return { expenses };
};
