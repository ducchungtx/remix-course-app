// /expenses/raw

import { requireUserSession } from '~/data/auth.server';
import { getExpenses } from '~/data/expenses.server';

export const loader = async ({ request }: { request: Request }) => {
  const userId = await requireUserSession(request);

  const expenses = await getExpenses(userId);
  return { expenses };
};
