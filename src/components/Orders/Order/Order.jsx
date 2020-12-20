import moment from "moment";
import React from "react";
import CheckoutProduct from "../../Checkout/CheckoutProduct/CheckoutProduct";
import "./Order.scss";

const Order = ({ order }) => {
  return (
    <div className="order">
      <h2>Order</h2>
      <p>{moment.unix(order.data.created).format("MMMM Do YYYY, h:mma")}</p>
      <p className="order__id">
        <small>{order.id}</small>
      </p>
      {order.data.basket?.map((item) => (
        <CheckoutProduct key={item.id} {...item} hideButton />
      ))}
      <h3 className="order__total">
        Order Total{" "}
        {new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
          currencyDisplay: "narrowSymbol",
        }).format(order.data.amount / 100)}
      </h3>
    </div>
  );
};

export default Order;
