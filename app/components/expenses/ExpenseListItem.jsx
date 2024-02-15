import { Link } from '@remix-run/react';

import PropTypes from 'prop-types';

function ExpenseListItem({ id, title, amount }) {
  function deleteExpenseItemHandler() {
    // tbd
  }
  return (
    <article className="expense-item">
      <div>
        <h2 className="expense-title">{title}</h2>
        <p className="expense-amount">${amount.toFixed(2)}</p>
      </div>
      <menu className="expense-actions">
        <button onClick={deleteExpenseItemHandler}>Delete</button>
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
