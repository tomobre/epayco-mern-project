import React from "react";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <ul>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/register">register</Link>
      </li>
      <li>
        <Link to="/signin">signin</Link>
      </li>
      <li>
        <Link to="/buy">buy</Link>
      </li>
      <li>
        <Link to="/check">check</Link>
      </li>
      <li>
        <Link to="/loadwallet">loadwallet</Link>
      </li>
    </ul>
  );
};

export default NavBar;
