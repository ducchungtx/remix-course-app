import { redirect } from '@remix-run/node';
import AuthForm from '~/components/auth/AuthForm';
import { signup } from '~/data/auth.server';
import { validateCredentials } from '~/data/validation.server';
import authStyles from '~/styles/auth.css';

export default function AuthPage() {
  return <AuthForm />;
}

export const action = async ({ request }: { request: Request }) => {
  const searchParams = new URL(request.url).searchParams;
  const authMode = searchParams.get('mode') || 'login';

  const formData = await request.formData();
  const credentials = Object.fromEntries(formData);

  try {
    validateCredentials(credentials);
  } catch (error) {
    return error;
  }

  try {
    if (authMode === 'login') {
      // login
    } else {
      await signup({
        email: credentials.email,
        password: credentials.password,
      });
      return redirect('/expenses');
    }
  } catch (error: any) {
    if (error.status === 422) {
      return { credentials: error.message };
    }
  }
};

export const links = () => [{ rel: 'stylesheet', href: authStyles }];
