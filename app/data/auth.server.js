import { prisma } from './datatabse.server';
import bcrypt from 'bcryptjs';
import { createCookieSessionStorage, redirect } from '@remix-run/node';
import process from 'node:process';
import { create } from 'node:domain';

const SESSION_SECRET = process.env.SESSION_SECRET;

const sessionStorage = createCookieSessionStorage({
  cookie: {
    secure: process.env.NODE_ENV === 'production',
    secrets: [SESSION_SECRET],
    sameSite: 'lax',
    maxAge: 30 * 24 * 60 * 60, // 30 days
    httpOnly: true,
  },
});

const createUserSession = async (userId, redirectPath) => {
  const session = await sessionStorage.getSession();
  session.set('userId', userId);
  return redirect(redirectPath, {
    headers: {
      'Set-Cookie': await sessionStorage.commitSession(session),
    },
  });
}

export async function signup({ email, password }) {
  const existingUser = await prisma.user.findFirst({ where: { email } });

  if (existingUser) {
    const error = new Error('User already exists');
    error.status = 422;
    throw error;
  }

  const passwordHash = await bcrypt.hash(password, 12);
  await prisma.user.create({
    data: { email, password: passwordHash },
  });
  return createUserSession(existingUser.id, '/expenses');
}

export const getUserFromSession = async (request) => {
  const session = await sessionStorage.getSession(request.headers.get('Cookie'));
  const userId = session.get('userId');
  if (!userId) {
    return null;
  }
  return userId;
}

export async function login({ email, password }) {
  const existingUser = await prisma.user.findFirst({ where: { email } });

  if (!existingUser) {
    const error = new Error(
      'Could not log you in, please check your credentials and try again.'
    );
    error.status = 401;
    throw error;
  }

  const passwordMatch = await bcrypt.compare(password, existingUser.password);

  if (!passwordMatch) {
    const error = new Error(
      'Could not log you in, please check your credentials and try again.'
    );
    error.status = 401;
    throw error;
  }

  return createUserSession(existingUser.id, '/expenses');
}
