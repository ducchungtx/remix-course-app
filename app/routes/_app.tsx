import { Outlet } from '@remix-run/react';
import expensesStyle from "~/styles/expenses.css";

export const links = () => [
    { rel: 'stylesheet', href: expensesStyle }
];

export default function ExpensesAppLayout() {
    return (
        <>
            <Outlet />
        </>
    )
}
