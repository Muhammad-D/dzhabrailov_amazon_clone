import "./Checkout.scss";
import React from "react";
import amazonAdBanner from "../../assets/images/amazon_ad_banner.jpg";
import Subtotal from "./Subtotal/Subtotal";
import CheckoutProduct from "./CheckoutProduct/CheckoutProduct";
import { useStateValue } from "../../state-managment/StateProvider";
import FlipMove from "react-flip-move";

const Checkout = () => {
  const [{ basket, user }, dispatch] = useStateValue();

  return (
    <div className="checkout">
      <div className="checkout___left">
        <img src={amazonAdBanner} className="checkout__ad" alt="" />
        <div>
          <h3>Hello, {user?.email}</h3>
          <h2 className="checkout__title">Your checkout basket</h2>
        </div>
        <FlipMove>
          {basket.map((basketItem) => {
            return <CheckoutProduct key={basketItem.id} {...basketItem} />;
          })}
        </FlipMove>
      </div>
      <div className="checkout___rights">
        <Subtotal />
      </div>
    </div>
  );
};

export default Checkout;
