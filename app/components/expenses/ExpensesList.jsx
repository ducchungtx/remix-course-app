import ExpenseListItem from './ExpenseListItem';

import PropTypes from 'prop-types';

function ExpensesList({ expenses }) {
  return (
    <ol id="expenses-list">
      {expenses.map((expense) => (
        <li key={expense.id}>
          <ExpenseListItem
            id={expense.id}
            title={expense.title}
            amount={expense.amount}
          />
        </li>
      ))}
    </ol>
  );
}

ExpensesList.propTypes = {
  expenses: PropTypes.array.isRequired,
};

export default ExpensesList;
