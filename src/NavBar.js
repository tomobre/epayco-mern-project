import React from "react";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <nav className="navbar navbar-expand navbar-light bg-light">
      <div className="container-fluid">
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav ">
            <Link className="me-3" to="/">
              Inicio
            </Link>
            <Link className="me-3" to="/register">
              Registrarse
            </Link>
            <Link className="me-3" to="/buy">
              Comprar
            </Link>
            <Link className="me-3" to="/check">
              Saldo actual
            </Link>
            <Link className="me-3" to="/loadwallet">
              Cargar saldo
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
