import React, { useEffect, useState } from "react";
import Product from "./Product/Product";
import "./Home.scss";
import { db } from "../../firebase";

const Home = () => {
  const [products, setProducts] = useState([]);
  window.products = products;
  useEffect(() => {
    db.collection("products")
      .orderBy("timestamp")
      .onSnapshot((snapshot) =>
        setProducts(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        )
      );
  }, []);
  return (
    <div className="home">
      <div className="home__container">
        <img
          className="home__image"
          src="https://images-eu.ssl-images-amazon.com/images/G/02/digital/video/merch2016/Hero/Covid19/Generic/GWBleedingHero_ENG_COVIDUPDATE__XSite_1500x600_PV_en-GB._CB428683220_.jpg"
        />
        <div className="home__row">
          {products.map(({ id, data }, i) => {
            if (i === 0 || i === 1) {
              return (
                <Product
                  key={id}
                  id={id}
                  title={data.title}
                  image={data.image}
                  rating={data.rating}
                  price={data.price}
                />
              );
            }
          })}
        </div>
        <div className="home__row">
          {products.map(({ id, data }, i) => {
            if (i > 1 && i <= 4) {
              return (
                <Product
                  key={id}
                  id={id}
                  title={data.title}
                  image={data.image}
                  rating={data.rating}
                  price={data.price}
                />
              );
            }
          })}
        </div>
        <div className="home__row">
          {products.map(({ id, data }, i) => {
            if (i === 5) {
              return (
                <Product
                  key={id}
                  id={id}
                  title={data.title}
                  image={data.image}
                  rating={data.rating}
                  price={data.price}
                />
              );
            }
          })}
        </div>
      </div>
    </div>
  );
};

export default Home;
