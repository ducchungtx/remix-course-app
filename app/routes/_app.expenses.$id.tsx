// /expenses/:id
import { json, redirect, useNavigate } from '@remix-run/react';
import ExpenseForm from '~/components/expenses/ExpenseForm';
import Modal from '~/components/util/Modal';
import { deleteExpense, updateExpense } from '~/data/expenses.server';
import { validateExpenseInput } from '~/data/validation.server';

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
  if (request.method === 'PATCH') {
    const formData = await request.formData();
    const expense = Object.fromEntries(formData);
    try {
      validateExpenseInput(request);
    } catch (error) {
      return error;
    }
    await updateExpense(expenseId, expense);
    return redirect('/expenses');
  } else if (request.method === 'DELETE') {
    await deleteExpense(expenseId);
    return redirect('/expenses');
  }
};
