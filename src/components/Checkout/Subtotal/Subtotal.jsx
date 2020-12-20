import React from "react";
import { getBasketTotal } from "../../../state-managment/main-reducer";
import { useStateValue } from "../../../state-managment/StateProvider";
import { useHistory } from "react-router-dom";
import "./Subtotal.scss";

const Subtotal = () => {
  const history = useHistory();
  const [{ basket }, dispatch] = useStateValue();

  const price = getBasketTotal(basket);

  return (
    <div className="subtotal">
      <p>
        Subtotal ({basket?.length} items):
        <strong>
          {new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
          }).format(price)}
        </strong>
      </p>
      <small className="subtotal__gift">
        <input type="checkbox" /> This order contains gift
      </small>
      <button onClick={(e) => history.push("/payment")}>
        Proceed to checkout
      </button>
    </div>
  );
};

export default Subtotal;
