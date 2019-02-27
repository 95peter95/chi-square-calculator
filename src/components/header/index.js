import { h } from "preact";
import { Link } from "preact-router/match";
import style from "./style";

const Header = () => (
  <header class={style.header}>
    <h1>Preact App</h1>
    <nav>
      <Link activeClassName={style.active} href="/">
        ChiSquare value calculator
      </Link>
      <Link activeClassName={style.active} href="/profile">
        Me
      </Link>
    </nav>
  </header>
);

export default Header;
