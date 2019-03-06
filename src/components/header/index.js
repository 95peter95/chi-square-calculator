import { h } from "preact";
import { Link } from "preact-router/match";
import style from "./style";

const Header = () => (
  <header class={style.header}>
    <h1>ChiSquare statistic calculator for 2x2 Table</h1>
    <nav>
      <Link activeClassName={style.active} href="/">
        ChiSquare statistic calculator
      </Link>
      <Link activeClassName={style.active} href="/profile">
        Me
      </Link>
    </nav>
  </header>
);

export default Header;
