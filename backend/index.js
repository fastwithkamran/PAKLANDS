require("dotenv").config();
const cors = require("cors");

const express = require("express");
const mongoose = require("mongoose");

const cookieParser = require("cookie-parser");

const authRoute = require("./routers/auth");
const propertyRoute = require("./routers/property");
const locationRoute = require("./routers/location");
const profileRoute = require("./routers/profile");

const handleSeedLocations = require("./services/seedLocation");

const app = express();
const PORT = process.env.PORT;

const allowedOrigins = ["http://localhost:5173"];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "PATCH", "DELETE"],
    credentials: true,
  }),
);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Atlas Connected");
  })
  .catch((err) => {
    console.log("Database Connection Failed", err);
  });

app.use(cookieParser());

handleSeedLocations();

app.use("/user", authRoute);
app.use("/property", propertyRoute);
app.use("/location", locationRoute);
app.use("/profile", profileRoute);

if (process.NODE_ENV !== "production") {
  app.listen(PORT, () => console.log("Server Started at ", PORT));
}
