require("dotenv").config();
const express = require(`express`);
const cors = require(`cors`);
const app = express();
const routes = require(`./controller`);
const database = require("./config/database");

const path = require("path");
const PORT = process.env.PORT || 4000;

const startServer = async () => {
  try {
    // Middleware to serve static files from the 'uploads' directory
    app.use("/uploads", express.static(path.join(__dirname, "uploads")));
    app.use(cors({ origin: "http://localhost:3000" }));
    app.use(express.json());
    app.use(routes());

    await database();
    app.listen(PORT, () => {
      console.log(`server is running on port ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};

startServer();
