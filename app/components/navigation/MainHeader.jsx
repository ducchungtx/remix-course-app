import { Link, NavLink, useLoaderData } from '@remix-run/react';
import Logo from '../util/Logo';

function MainHeader() {

  const userId = useLoaderData();
  console.log("userId: ", userId);

  return (
    <header id="main-header">
      <Logo />
      <nav id="main-nav">
        <ul>
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          <li>
            <NavLink to="/pricing">Pricing</NavLink>
          </li>
          <li>
            <NavLink to="/expenses">Expenses</NavLink>
          </li>
        </ul>
      </nav>
      <nav id="cta-nav">
        <ul>
          <li>
            <Link to="/auth" className="cta">
              Login
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default MainHeader;
