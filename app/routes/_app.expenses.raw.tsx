// /expenses/raw

import { getExpenses } from '~/data/expenses.server';

export const loader = async () => {
  const expenses = await getExpenses();
  return { expenses };
};
