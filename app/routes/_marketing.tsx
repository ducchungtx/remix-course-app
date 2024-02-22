import { Outlet } from '@remix-run/react'
import { getUserFromSession } from '~/data/auth.server'

import marketingStyles from '~/styles/marketing.css'

export default function MarketingLayout() {
  return (
    <Outlet />
  )
}

export const loader = ({ request }: { request: any }) => {
  return getUserFromSession(request);
}

export const links = () => [{ rel: 'stylesheet', href: marketingStyles }];
