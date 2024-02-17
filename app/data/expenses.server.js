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
    throw new Error('Could not add expense');
  }
};

export const getExpenses = async () => {
  try {
    const expenses = await prisma.expense.findMany({
      orderBy: { date: 'desc' },
    });
    return expenses;
  } catch (error) {
    throw new Error('Could not fetch expenses');
  }
};

export const getExpense = async (id) => {
  try {
    return await prisma.expense.findFirst({
      where: { id },
    });
  } catch (error) {
    throw new Error('Could not fetch expense');
  }
};

export const updateExpense = async (id, expense) => {
  try {
    return await prisma.expense.update({
      where: { id },
      data: {
        title: expense.title,
        amount: +expense.amount,
        date: new Date(expense.date),
      },
    });
  } catch (error) {
    throw new Error('Could not update expense');
  }
};

export const deleteExpense = async (id) => {
  try {
    return await prisma.expense.delete({
      where: { id },
    });
  } catch (error) {
    throw new Error('Could not delete expense');
  }
};
