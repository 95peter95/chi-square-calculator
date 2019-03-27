import { h } from "preact";
import { Link } from "preact-router/match";
import style from "./style";

const Header = () => (
  <header class={style.header}>
    <h1>Contingency Analysis Tool for 2x2 table</h1>
    <nav>
      <Link activeClassName={style.active} href="/">
        Tool
      </Link>
      <Link activeClassName={style.active} href="/profile">
        Me
      </Link>
    </nav>
  </header>
);

export default Header;
