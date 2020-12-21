import React, { useState } from "react";
import "./Hedaer_styling/Header.scss";
import YoutubeSearchedForIcon from "@material-ui/icons/YoutubeSearchedFor";
import { useStyles } from "./Hedaer_styling/HeaderJSS";
import ShoppingBasketIcon from "@material-ui/icons/ShoppingBasket";
import { NavLink } from "react-router-dom";
import { useStateValue } from "../../state-managment/StateProvider";
import amazonLogo from "../../assets/images/amazon_logo.png";
import { auth } from "../../firebase";
import BurgerBtn from "./BurgerBtn/BurgerBtn";
import HomeIcon from "@material-ui/icons/Home";

const Header = () => {
  const [burgerBtnDisplay, setBurgerBtnDisplay] = useState(false);
  const [burgerBtnAnimation, setBurgerBtnAnimation] = useState(false);

  const [{ basket, user }] = useStateValue();

  const classes = useStyles();

  const handleAuthentication = (e) => {
    if (user) auth.signOut();
  };

  const createDelay = (setState, state, ms = 0) =>
    setTimeout(() => {
      setState(state);
    }, ms);

  const handleMenuAnimation = (e) => {
    if (burgerBtnDisplay === false) {
      createDelay(setBurgerBtnDisplay, !burgerBtnDisplay);
      createDelay(setBurgerBtnAnimation, !burgerBtnAnimation, 100);
    } else if (burgerBtnDisplay === true) {
      createDelay(setBurgerBtnAnimation, !burgerBtnAnimation);
      createDelay(setBurgerBtnDisplay, !burgerBtnDisplay, 400);
    }
  };

  return (
    <div className="header">
      <NavLink to="/">
        <img className="header__logo" src={amazonLogo} />
      </NavLink>
      <div className="header__search">
        {/* SEARCH INPUT FIELD */}
        <input type="text" className="header__search-inpit" />
        {/* SEARCH LOGO */}
        <YoutubeSearchedForIcon className={classes["header__search-icon"]} />
      </div>
      <div
        className={`header__nav ${burgerBtnDisplay && "header__nav_visible"} ${
          burgerBtnAnimation && "header__nav_animation"
        }`}
      >
        {burgerBtnDisplay && (
          <NavLink to="/home" activeClassName="header__active-link">
            <div className="header__option">
              <HomeIcon />
            </div>
          </NavLink>
        )}
        <NavLink to={!user ? "/login" : "/"}>
          <div className="header__option" onClick={handleAuthentication}>
            <span className="header__first-line">
              {user ? `Hello, ${user?.email} ` : `Hello, Guest`}
            </span>
            <span className="header__second-line">
              {user ? `Sign Out` : ` Sign in`}
            </span>
          </div>
        </NavLink>
        <NavLink to="/orders" activeClassName="header__active-link">
          <div className="header__option">
            <span className="header__first-line">Returns</span>
            <span className="header__second-line">& Orders</span>
          </div>
        </NavLink>
        <NavLink to="/prime" activeClassName="header__active-link">
          <div className="header__option">
            <span className="header__first-line">Your</span>
            <span className="header__second-line">Prime</span>
          </div>
        </NavLink>
        <NavLink to="/checkout" activeClassName="header__active-link">
          <div className="header__option header__option_basket">
            <ShoppingBasketIcon className="header__basket" />
            <span className="header__second-line">{basket?.length}</span>
          </div>
        </NavLink>
      </div>
      <BurgerBtn
        handleMenuAnimation={handleMenuAnimation}
        burgerBtnAnimation={burgerBtnAnimation}
      />
    </div>
  );
};

export default Header;
