import "./App.css";
import Register from "./Register";
import SignIn from "./SignIn";
import Buy from "./Buy";
import Check from "./Check";
import LoadWallet from "./LoadWallet";
import Home from "./Home";
import { Route, Link } from "react-router-dom";
import NavBar from "./NavBar.js";

function App() {
  return (
    <div>
      EpayCo
      <NavBar />
      <Route exact path="/" component={Home} />
      <Route exact path="/register" component={Register} />
      <Route exact path="/signin" component={SignIn} />
      <Route exact path="/buy" component={Buy} />
      <Route exact path="/check" component={Check} />
      <Route exact path="/loadwallet" component={LoadWallet} />
    </div>
  );
}

export default App;
