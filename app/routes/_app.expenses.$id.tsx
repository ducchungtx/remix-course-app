// /expenses/:id
import { json, redirect, useNavigate } from '@remix-run/react';
import ExpenseForm from '~/components/expenses/ExpenseForm';
import Modal from '~/components/util/Modal';
import { updateExpense } from '~/data/expenses.server';

export default function UpdateExpensesPage() {
  const navigate = useNavigate();
  function closeHandler() {
    navigate('..');
  }

  return (
    <Modal onClose={closeHandler}>
      <ExpenseForm />
    </Modal>
  );
}

// export const loader = async ({ params }: { params: { id: string } }) => {
//   const expenseId = params.id;
//   const expense = await getExpense(expenseId);
//   return json({ expense });
// };

export const action = async ({
  params,
  request,
}: {
  params: { id: string };
  request: Request;
}) => {
  const expenseId = params.id;
  const formData = await request.formData();
  const expense = Object.fromEntries(formData);
  await updateExpense(expenseId, expense);
  return redirect('/expenses');
};
