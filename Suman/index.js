import dotenv from "dotenv";
dotenv.config();

import express from "express";
const app = express();

import { connectDB } from "./db/Connection_DB.js";
import { errorMiddleware } from "./middlewares/error.middleware.js";
import { notFoundMiddleware } from "./middlewares/notFound.middleware.js";

const PORT = 4000 ;

// // middlewares

// Basic configuration set-up to receive JSON data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running at PORT: ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });

// User Routes
import userRouter from "./routes/user.routes.js";
app.use("/api/v1/users", userRouter);

// Error Handler Middleware
app.use(notFoundMiddleware);
app.use(errorMiddleware);
