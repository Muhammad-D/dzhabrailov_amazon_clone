import React, { useContext } from "react";
import { addItemToBasketAC } from "../../../state-managment/main-reducer";
import { useStateValue } from "../../../state-managment/StateProvider";
import "./Product.scss";

const Product = ({ id, title, image, rating, price }) => {
  // let titleTruncate;
  // if (title.length > 90) {
  //   const maxLength = 90;
  //   titleTruncate = title.substring(0, maxLength) + "...";
  // }

  const [{ basket }, dispatch] = useStateValue();

  const addToBasket = (e) => {
    dispatch(
      addItemToBasketAC({
        id,
        title,
        image,
        rating,
        price,
      })
    );
  };

  return (
    <div className="product">
      <div className="product__info">
        <div className="product__description">
          <p>{title}</p>
        </div>
        <div className="product__price">
          <small>$</small>
          <strong>{price}</strong>
        </div>
        <div className="product__rating">
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
      </div>
      <img src={image} alt="" className="product__image" />
      <button className="product__button" onClick={addToBasket}>
        Add to basket
      </button>
    </div>
  );
};

export default Product;
