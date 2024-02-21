import { prisma } from './datatabse.server';
import bcrypt from 'bcryptjs';
import { createCookieSessionStorage } from '@remix-run/node';
import process from 'node:process';

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

  return existingUser;
}
