import { Outlet } from '@remix-run/react';
import ExpensesHeader from '~/components/navigation/ExpensesHeader';
import expensesStyle from '~/styles/expenses.css';

export const links = () => [{ rel: 'stylesheet', href: expensesStyle }];

export default function ExpensesAppLayout() {
  return (
    <>
      <ExpensesHeader />
      <Outlet />
    </>
  );
}
