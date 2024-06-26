import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

import AuthRoute from "./Routes/AuthRoute.js";
import UserRoute from "./Routes/UserRoutes.js";
import PostRoute from "./Routes/PostRoute.js";
import uploadRoute from "./Routes/UploadRoute.js";
import ChatRoute from "./Routes/ChatRoute.js"
import MessageRoute from "./Routes/MessageRoute.js"
import CommentRoute from "./Routes/CommentRoute.js"
const app = express();
// to serve images to public
app.use(express.static('public'))
app.use('/images',express.static("images"))

// Middleware setup
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors()); // Enable CORS

dotenv.config();

mongoose
  .connect(process.env.MONGO_DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`Database connected and listening at ${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });

// Routes setup
app.use("/auth", AuthRoute);
app.use("/user", UserRoute);
app.use("/post", PostRoute);
app.use("/upload", uploadRoute);

app.use("/chat", ChatRoute);
app.use('/message', MessageRoute)
app.use('/comment',CommentRoute)
export default app;
