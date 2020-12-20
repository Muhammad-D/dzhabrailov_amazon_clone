const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const stripe = require("stripe")(
  "sk_test_51HsQrBH6fGgfAP3e86MVKiHBDWFi9fX9hjmmRyjfTVg3a4dUFy0WRoeXdYND5ybGnjGDTNUX7q5TyNNSdSQ9i9pg00qbCvoXtZ"
);

// API

// - App config
const app = express();

// - Middlewares
app.use(cors({ origin: true }));
app.use(express.json());

// - API routes
app.get("/", (request, response) => response.status(200).send("Hello world"));
app.post("/payments/create", async (request, response) => {
  const total = request.query.total;
  console.log("Payment Request Recieved BOOM!!! for this amount >>> ", total);
  const paymentIntent = await stripe.paymentIntents.create({
    amount: total,
    currency: "usd",
  });

  response.status(201).send({
    clientSecret: paymentIntent.client_secret,
  });
});

// -  Listen command

exports.api = functions.https.onRequest(app);

//  Example endpoint
//  http://localhost:5001/dzhabrailov--clone/us-central1/api
