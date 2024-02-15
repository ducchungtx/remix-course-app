import { Form, Link, useFetcher, useSubmit } from '@remix-run/react';

import PropTypes from 'prop-types';

function ExpenseListItem({ id, title, amount }) {
  // const submit = useSubmit();
  const fetcher = useFetcher();

  function deleteExpenseItemHandler() {
    confirm('Are you sure you want to delete this expense?');
    // submit(null, { method: 'delete', action: `/expenses/${id}` });
    fetcher.submit(null, { method: 'delete', action: `/expenses/${id}` });
  }

  if (fetcher.state !== 'idle') {
    return <article className="expense-item locker">
      <p>Deleting...</p>
    </article>;
  }

  return (
    <article className="expense-item">
      <div>
        <h2 className="expense-title">{title}</h2>
        <p className="expense-amount">${amount.toFixed(2)}</p>
      </div>
      <menu className="expense-actions">
        <button onClick={deleteExpenseItemHandler}>Delete</button>
        {/* <Form method='delete' action={`/expenses/${id}`}>
          <button>Delete</button>
        </Form> */}
        <Link to={id}>Edit</Link>
      </menu>
    </article>
  );
}

ExpenseListItem.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  amount: PropTypes.number.isRequired,
};

export default ExpenseListItem;
