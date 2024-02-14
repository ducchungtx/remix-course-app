import { prisma } from './datatabse.server';

export const addExpense = async (expense) => {
  try {
    return await prisma.expense.create({
      data: {
        title: expense.title,
        amount: +expense.amount,
        date: new Date(expense.date),
      },
    });
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getExpenses = async () => {
  try {
    const expenses = await prisma.expense.findMany({
      orderBy: { date: 'desc' },
    });
    return expenses;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
