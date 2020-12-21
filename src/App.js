import "./App.css";
import Header from "./components/Header/Header";
import Home from "./components/Home/Home";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Checkout from "./components/Checkout/Checkout";
import Login from "./components/Login/Login";
import { useStateValue } from "./state-managment/StateProvider";
import { useEffect } from "react";
import { auth } from "./firebase";
import { setUserAC } from "./state-managment/main-reducer";
import Payment from "./components/Payment/Payment";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import Orders from "./components/Orders/Orders";

const promise = loadStripe(
  "pk_test_51HsQrBH6fGgfAP3ejWYmacw2jQSfxCDMtX3zmHpTspmfP1Ml2eLoGLFaOBE9HBFFzS8h8ylI5iV29T9jOzmgkZfc00L6f3ai88"
);

function App() {
  const [state, dispatch] = useStateValue();
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      console.log(`THE USER IS >>>`, authUser);
      if (authUser) {
        dispatch(setUserAC(authUser));
      } else {
        dispatch(setUserAC(null));
      }
    });
    return () => unsubscribe();
  }, []);

  return (
    <Router>
      <div className="app">
        <Switch>
          <Route path="/orders">
            <Header />
            <Orders />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/checkout">
            <Header />
            <Checkout />
          </Route>
          <Route path="/payment">
            <Header />
            <Elements stripe={promise}>
              <Payment />
            </Elements>
          </Route>
          <Route path="/">
            <Header />
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
