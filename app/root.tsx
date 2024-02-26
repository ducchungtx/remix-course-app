import { cssBundleHref } from '@remix-run/css-bundle';
import type { LinksFunction, MetaFunction } from '@remix-run/node';
import {
  Link,
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  isRouteErrorResponse,
  useRouteError,
} from '@remix-run/react';

import Error from '~/components/util/Error';
import sharedStyles from '~/styles/shared.css';

export const links: LinksFunction = () => [
  ...(cssBundleHref ? [{ rel: 'stylesheet', href: cssBundleHref }] : []),
  { rel: 'stylesheet', href: sharedStyles },
];

export const meta: MetaFunction = () => {
  return [
    { charset: 'utf-8' },
    { title: 'RemixExpenses' },
    { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    {
      name: 'description',
      content: 'A simple app to demonstrate Remix features',
    },
  ];
};

type DocumentProps = {
  title: string;
  children: React.ReactNode;
};

const Document = ({ title, children }: DocumentProps) => {
  return (
    <html lang="en">
      <head>
        {title && <title>{title}</title>}
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Rubik:wght@400;700&display=swap"
          rel="stylesheet"
        />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
};

export default function App() {
  return (
    <Document title="Expense App">
      <Outlet />
    </Document>
  );
}

export function ErrorBoundary() {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    return (
      <Document title={error.statusText}>
        <main>
          <Error title={error.statusText}>
            <p>
              {error.data?.message ||
                'Something went wrong, please try again later!'}
            </p>
            <p>
              Back to <Link to="/">safety</Link>.
            </p>
          </Error>
        </main>
      </Document>
    );
  }
}
