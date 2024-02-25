import { Outlet } from '@remix-run/react';

import { getUserFromSession } from '~/data/auth.server';
import MainHeader from '~/components/navigation/MainHeader';
import marketingStyles from '~/styles/marketing.css';

export default function MarketingLayout() {
  return (
    <>
      <MainHeader />
      <Outlet />
    </>
  );
}

export const loader = ({ request }: { request: any }) => {
  return getUserFromSession(request);
};

export const links = () => [{ rel: 'stylesheet', href: marketingStyles }];
