const { userServices } = require("../../services");

module.exports = async (req, res) => {
  return await userServices.markattendance(req, res);
};
