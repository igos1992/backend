const express = require("express");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const userRouter = require("./routers/users");
const bookRouter = require("./routers/books");
const loggerOne = require("./middlewares/loggerOne");

dotenv.config();

const app = express();

const {
  PORT = 3000,
  API_URL = "http://127.0.0.1",
  MONGO_URL = "mongodb://localhost:27017/backend",
} = process.env;

const helloWorld = (request, response) => {
  response.status(200);
  response.send("Hello");
};

const HelloFromPOST = (request, response) => {
  response.status(200);
  response.send("Hello from POST");
};

mongoose
  .connect(MONGO_URL)
  .then(() => console.log("Connected to Mongo!"))
  .catch((error) => console.log("[MONGO_CONNECTION]", error));

app.use(cors());
app.use(loggerOne);
app.use(bodyParser.json());

app.get("/", helloWorld);

app.post("/", HelloFromPOST);

app.use(userRouter);
app.use(bookRouter);

app.listen(PORT, () => {
  console.log(`Сервер запущен по адресу ${API_URL}:${PORT}`);
});
