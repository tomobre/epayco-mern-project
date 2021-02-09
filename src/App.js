import "./App.css";
import Register from "./Register";

import Buy from "./Buy";
import Check from "./Check";
import LoadWallet from "./LoadWallet";
import Home from "./Home";
import { Route } from "react-router-dom";
import NavBar from "./NavBar.js";
import logo from "./QHdEZYPn_400x400.jpg";

function App() {
  return (
    <div className="container">
      <div>
        <img src={logo} alt="epayco logo" />
      </div>

      <NavBar className="d-flex justify-content-center" />
      <Route exact path="/" component={Home} />
      <Route exact path="/register" component={Register} />
      <Route exact path="/buy" component={Buy} />
      <Route exact path="/check" component={Check} />
      <Route exact path="/loadwallet" component={LoadWallet} />
    </div>
  );
}

export default App;
