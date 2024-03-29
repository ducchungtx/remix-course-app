// /expenses

import { Link, Outlet, json, useLoaderData } from '@remix-run/react';
import { FaDownload, FaPlus } from 'react-icons/fa';

import ExpensesList from '~/components/expenses/ExpensesList';
import { requireUserSession } from '~/data/auth.server';
import { getExpenses } from '~/data/expenses.server';

export default function ExpensesLayout() {
  const { expenses } = useLoaderData<{ expenses: [] }>();

  const hasExpenses = expenses && expenses.length > 0;

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
        {hasExpenses && <ExpensesList expenses={expenses} />}
        {!hasExpenses && (
          <section id="no-expenses">
            <h1>No expenses found</h1>
            <p>
              Start <Link to="add">adding some</Link> today.
            </p>
          </section>
        )}
      </main>
    </>
  );
}

export const loader = async ({ request }: { request: Request }) => {
  const userId = await requireUserSession(request);
  const expenses = await getExpenses(userId);
  // if (!expenses || expenses.length === 0) {
  //   throw json(
  //     { message: 'No expenses found' },
  //     { status: 404, statusText: 'No expenses found' }
  //   );
  // }
  return json({ expenses });
};
