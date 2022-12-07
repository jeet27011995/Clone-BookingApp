import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import authRoute from "./routes/auth.js";
import hotelsRoute from "./routes/hotels.js";
import usersRoute from "./routes/users.js";
import roomsRoute from "./routes/rooms.js";
import cors from "cors";

const app = express();

dotenv.config();
const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO);
    console.log("Connected to mongoDB.");
  } catch (error) {
    throw error;
  }
};
mongoose.connection.on("disconnected", () => {
  console.log("mongoDB disconnected!");
});
app.use(cors());
app.use(cookieParser());
app.use(express.json());

app.use("/api/auth", authRoute); //for login and register user
app.use("/api/users", usersRoute);
app.use("/api/hotels", hotelsRoute);
app.use("/api/rooms", roomsRoute);

//middle ware
app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went wrong";
  return res.status(errorStatus).json({
    sucess: false,
    status: errorStatus,
    message: errorMessage,
    stack: err.stack,
  });
});

app.listen(5000, () => {
  connect();
  console.log("Connected to backend");
});
