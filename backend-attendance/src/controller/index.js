const express = require(`express`);

const users = require("./user");
const routes = express.Router();

module.exports = () => {
  routes.use("/api", users());

  return routes;
};
