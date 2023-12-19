const express = require("express");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const userRouter = require("./routers/users");
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

// mongoose.connect('mongodb://127.0.0.1:27017/mydb', err => {
//     if(err) throw err;
//     console.log('Connected to MongoDB');
// });

app.use(cors());
app.use(loggerOne);
app.use(bodyParser.json());

app.get("/", helloWorld);

app.post("/", HelloFromPOST);

// app.get("/users/34", (request, response) => {
//   response.status(200);
//   response.send("User with id: 34");
// });

app.use(userRouter);

// app.post("/", (request, response) => {
//   response.status(200);
//   response.send("Hello from POST");
// });

app.listen(PORT, () => {
  console.log(`Сервер запущен по адресу ${API_URL}:${PORT}`);
});
