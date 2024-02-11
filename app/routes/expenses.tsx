// /expenses

import { Outlet } from '@remix-run/react';
import expensesStyles from '~/styles/expenses.css';

export default function ExpensesLayout() {
  return (
    <main>
      <p>Shared element!</p>
      <Outlet />
    </main>
  );
}

export const links = () => [{ rel: 'stylesheet', href: expensesStyles }];
