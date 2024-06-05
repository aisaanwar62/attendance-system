const express = require("express");
const multer = require("multer");
const path = require("path");
// This will save files to an 'uploads' directory
const adminlogin = require("./adminlogin");

const userlogin = require("./userlogin");
const userregister = require("./userregister");

const adduser = require("./markattendance");
const getuser = require("./getuser");
const deleteuser = require("./deleteuser");
const edituser = require("./editattendance");
const user = require("../../models/user");
const editpicture = require("./editpicture");
const markattendance = require("./markattendance");
const viewattendance = require("./viewattendance");
const applyleave = require("./applyleave");
const getallleaverequests = require("./getallleaverequests");
const updateleavestatus = require("./updateleavestatus");
const getleaverequest = require("./getleaverequest");
const viewallattendance = require("./viewallattendance");
const addattendance = require("./addattendance");
const editattendance = require("./editattendance");
const deleteattendance = require("./deleteattendance");
const generatereport = require("./generatereport");
const gradesettings = require("./gradesettings");
const postgradesettings = require("./postgradesettings");

const routes = express.Router();

// Configure storage for multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "src/uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage: storage });

module.exports = () => {
  routes.post("/admin/login", adminlogin);
  routes.post("/users/login", userlogin);
  routes.post("/users/register", upload.single("picture"), userregister);
  routes.get("/users/getuser/:_id", upload.single("profilePicture"), getuser);
  routes.patch(
    "/users/editpicture/:_id",
    upload.single("picture"),
    editpicture
  );
  routes.post("/users/markattendance/:_id", markattendance);
  routes.get("/users/viewattendance/:_id", viewattendance);

  routes.post("/users/applyleave/:_id", applyleave);
  routes.get("/users/getleaverequests/:_id", getleaverequest);
  // routes.get("/getallleaverequests", getallleaverequests);
  routes.put("/updateleavestatus/:requestId", updateleavestatus);

  routes.get("/admin/viewallattendance", viewallattendance);
  routes.post("/admin/addattendance", addattendance);
  routes.patch("/admin/editattendance/:id", editattendance);
  routes.delete("/admin/deleteattendance/:id", deleteattendance);

  routes.get("/admin/getallleaverequests", getallleaverequests);
  routes.patch("/admin/updateleavestatus/:id", updateleavestatus);
  routes.get("/admin/generatereport", generatereport);
  routes.get("/admin/gradesettings", gradesettings);
  routes.post("/admin/postgradesettings", postgradesettings);
  return routes;
};
