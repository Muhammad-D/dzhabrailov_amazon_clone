import React, { forwardRef } from "react";
import { removeItemFromBasketAC } from "../../../state-managment/main-reducer";
import { useStateValue } from "../../../state-managment/StateProvider";
import "./CheckoutProduct.scss";

const CheckoutProduct = forwardRef(
  ({ id, price, image, rating, title, hideButton }, ref) => {
    const [{ basket }, dispatch] = useStateValue();
    const removeItem = (e) => {
      dispatch(removeItemFromBasketAC(id));
    };

    return (
      <div ref={ref} className="checkout-product">
        <img src={image} className="checkout-product__image" />
        <div className="checkout-product__info">
          <p className="checkout-product__title">{title}</p>
          <div className="checkout-product__price">
            <small>$</small>
            <strong>
              {new Intl.NumberFormat("de-DE", {
                style: "currency",
                currency: "USD",
              }).format(price)}
            </strong>
          </div>
          <div className="checkout-product__rating">
            {Array(rating)
              .fill()
              .map((_, i) => {
                return (
                  <span key={id + i} className="product_star">
                    ⭐
                  </span>
                );
              })}
          </div>
          {!hideButton && (
            <button className="checkout-product__btn" onClick={removeItem}>
              Remove from basket
            </button>
          )}
        </div>
      </div>
    );
  }
);

export default CheckoutProduct;
