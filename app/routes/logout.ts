import { json } from '@remix-run/node';
import { destroyUserSession } from '~/data/auth.server';

export function action({ request }: { request: any }) {
  if (request.method !== 'POST') {
    throw json({ message: 'Invalid request method' }, { status: 400 });
  }

  return destroyUserSession(request);
}
