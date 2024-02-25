// /expenses/analysis
import ExpenseStatistics from '~/components/expenses/ExpenseStatistics';
import Chart from '~/components/expenses/Chart';
import { getExpenses } from '~/data/expenses.server';
import { json } from '@remix-run/node';
import {
  Link,
  isRouteErrorResponse,
  useLoaderData,
  useRouteError,
} from '@remix-run/react';
import Error from '~/components/util/Error';
import { requireUserSession } from '~/data/auth.server';

export default function ExpensesAnalysisPage() {
  const expenses = useLoaderData();
  return (
    <main>
      <ExpenseStatistics expenses={expenses} />
      <Chart expenses={expenses} />
    </main>
  );
}

export const loader = async ({ request }: { request: Request }) => {
  const userId = await requireUserSession(request);

  const expenses = await getExpenses(userId);

  if (!expenses || expenses.length === 0) {
    throw json(
      { message: 'No expenses found' },
      { status: 404, statusText: 'No expenses found' }
    );
  }

  return expenses;
};

export function ErrorBoundary() {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    return (
      <main>
        <Error title={error.statusText}>
          <p>
            {error.data?.message ||
              'Something went wrong - could not load expenses!'}
          </p>
          <p>
            Back to <Link to="/">safety</Link>.
          </p>
        </Error>
      </main>
    );
  }
}
