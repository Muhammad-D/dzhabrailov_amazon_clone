import React, { useEffect, useState } from "react";
import { useStateValue } from "../../state-managment/StateProvider";
import CheckoutProduct from "../Checkout/CheckoutProduct/CheckoutProduct";
import FlipMove from "react-flip-move";
import "./Payment.scss";
import { NavLink, useHistory } from "react-router-dom";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import {
  getBasketTotal,
  emptyBasket,
} from "../../state-managment/main-reducer";
import Axios from "../../assets/api/axios";
import { db } from "../../firebase";

const Payment = () => {
  const history = useHistory();

  const [{ basket, user }, dispatch] = useStateValue();
  const stripe = useStripe();
  const elements = useElements();

  const [processing, setProcessing] = useState("");
  const [succeeded, setSucceeded] = useState(false);
  const [error, setError] = useState(null);
  const [disabled, setDisabled] = useState(true);
  const [clientSecret, setClientSecret] = useState(true);

  useEffect(() => {
    const getClientSecret = async () => {
      const response = await Axios({
        method: "post",
        url: `/payments/create/?total=${getBasketTotal(basket) * 100}`,
      });
      setClientSecret(response.data.clientSecret);
    };
    getClientSecret();
  }, [basket]);

  console.log("THE SECRET IS >>> ", clientSecret);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setProcessing(true);

    const payload = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
      },
    });

    const payloadHandler = ({ paymentIntent }) => {
      //paymentIntent == payment confirmation

      db.collection("users")
        .doc(user?.uid)
        .collection("orders")
        .doc(paymentIntent.id)
        .set({
          basket: basket,
          amount: paymentIntent.amount,
          created: paymentIntent.created,
        });

      setSucceeded(true);
      setError(null);
      setProcessing(false);

      dispatch(emptyBasket());

      history.replace("/orders");
    };
    payloadHandler(payload);
    // >>>>>
  };

  const handleChange = (e) => {
    console.log(e);
    setDisabled(e.empty);
    setError(e.error ? e.error.message : "");
    //.......
  };

  return (
    <div className="payment">
      <div className="payment__container">
        <h1>
          Checkout (<NavLink to="/checkout"> {basket?.length} items</NavLink>)
        </h1>
        <div className="payment__section">
          <div className="payment__title">
            {" "}
            <h3>Delivery Address</h3>{" "}
          </div>
          <div className="payment__address">
            <p>{user?.email}</p>
            <p>123 React Line</p>
            <p>Moscow</p>
          </div>
        </div>
        <div className="payment__section">
          <div className="payment__title">
            <h3>Review items and delivery</h3>
          </div>
          <div className="payment__items">
            <FlipMove>
              {basket.map((basketItem) => {
                return <CheckoutProduct key={basketItem.id} {...basketItem} />;
              })}
            </FlipMove>
          </div>
        </div>
        <div className="payment__section">
          <div className="payment__title">
            <h3>Payment Method</h3>
          </div>
          <div className="payment__details">
            <form onSubmit={handleSubmit}>
              <CardElement onChange={handleChange} />
              <div className="payment__price-container">
                <h3>
                  Order Total{" "}
                  {new Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: "USD",
                    currencyDisplay: "narrowSymbol",
                  }).format(getBasketTotal(basket))}
                </h3>
                <button disabled={processing || disabled || succeeded}>
                  {processing ? <p>Processing</p> : "Buy now"}
                </button>
              </div>
              {/* Error */}
              {error && <div>{error}</div>}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
