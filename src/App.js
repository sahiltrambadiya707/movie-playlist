import logo from "./logo.svg";
import "./App.css";
import Router from "./routes";
import { Switch } from "react-router-dom";
import Header from "./components/header/header";
import Footer from "./components/footer/footer";

function App() {
  return (
    <div>
      <Switch>
        <Router />
      </Switch>
    </div>
  );
}

export default App;
