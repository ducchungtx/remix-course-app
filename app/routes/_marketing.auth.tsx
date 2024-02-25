import AuthForm from '~/components/auth/AuthForm';
import { login, signup } from '~/data/auth.server';
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
    try {
      if (authMode === 'login') {
        return await login({
          email: credentials.email,
          password: credentials.password,
        });
      } else {
        return await signup({
          email: credentials.email,
          password: credentials.password,
        });
      }
    } catch (error: any) {
      if (/(422|401|403)/.test(error.status)) {
        return { credentials: error.message };
      }
      return { credentials: 'Something went wrong!' };
    }
  } catch (error: any) {
    if (error.status === 422) {
      return { credentials: error.message };
    }
  }
};

export const links = () => [{ rel: 'stylesheet', href: authStyles }];
