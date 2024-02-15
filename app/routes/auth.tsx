import AuthForm from '~/components/auth/AuthForm';
import authStyles from '~/styles/auth.css';

export default function AuthPage() {
  return <AuthForm />;
}

export const action = async ({ request }: { request: Request }) => {
  const searchParams = new URL(request.url).searchParams;
  const authMode = searchParams.get('mode') || 'login';

  const formData = await request.formData();
  const credentials = Object.fromEntries(formData);
  console.log(credentials);

  // validate user input

  if (authMode === 'login') {
    // login
  } else {
    // signup
  }
};

export const links = () => [{ rel: 'stylesheet', href: authStyles }];
