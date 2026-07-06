require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const path = require("path");

const cookieParser = require("cookie-parser");

const authRoute = require("./routers/auth");

const {
  checkForAuthenticationCookie,
} = require("./middlewares/authentication");

const app = express();
const PORT = process.env.PORT;

mongoose
  .connect("mongodb://localhost:27017/real-estate")
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((err) => {
    console.log("Error", err);
  });


app.use(express.urlencoded({ extended: false }));

app.use(cookieParser());
app.use(checkForAuthenticationCookie("token"));

app.use(express.static(path.resolve("./public")));

app.use("/user", authRoute);

app.listen(PORT, () => console.log("Server Started"));
