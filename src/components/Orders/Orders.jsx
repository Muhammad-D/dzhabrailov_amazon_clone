import React, { useEffect, useState } from "react";
import { db } from "../../firebase";
import { useStateValue } from "../../state-managment/StateProvider";
import Order from "./Order/Order";
import "./Orders.scss";

const Orders = () => {
  const [{ user }, disptch] = useStateValue();
  const [orders, setOrders] = useState([]);
  window.orders = orders;

  useEffect(() => {
    if (user) {
      db.collection("users")
        .doc(user?.uid)
        .collection("orders")
        .orderBy("created", "desc")
        .onSnapshot((snapshot) =>
          setOrders(
            snapshot.docs.map((doc) => ({
              id: doc.id,
              data: doc.data(),
            }))
          )
        );
    } else {
      setOrders([]);
    }
  }, [user]);

  return (
    <div className="orders">
      <h1>Your orders</h1>
      <div className="orders__order">
        {orders?.map((order) => (
          <Order key={order.id} order={order} />
        ))}
      </div>
    </div>
  );
};

export default Orders;
