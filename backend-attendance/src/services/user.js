const Auth = require("../models/auth");
const User = require("../models/user");
const multer = require("multer");
const upload = multer({ dest: "uploads/" }); // This will save files to an 'uploads' directory
const bcrypt = require("bcryptjs");
const leavesrequest = require("../models/leavesrequest");
const Attendance = require("../models/attendance");
const GradeSetting = require("../models/gradesettings");

const adminlogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const isExisted = await Auth.findOne({ email: email });
    if (!isExisted) {
      return res.status(409).send({ message: "email is not found" });
    }

    const comparePassword = await bcrypt.compare(password, isExisted.password);

    if (!comparePassword) {
      return res.status(409).send({ message: "password is not correct!" });
    }

    res.status(201).send({ message: "admin login successfully" });
  } catch (error) {
    console.error(error);
  }
};
const userregister = async (req, res) => {
  try {
    const { email, password, loginId } = req.body;
    const picture = req.file.path;
    console.log("picture", picture);
    const hashpassword = await bcrypt.hash(password, 10);
    const user = new User({
      email: email,
      password: hashpassword,
      fullName: loginId,
      picture,
    });

    await user.save();
    res.status(201).send({ message: "user registered successfully" });
  } catch (error) {
    console.error(error);
  }
};

const userlogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const isExisted = await User.findOne({ email: email });
    if (!isExisted) {
      return res.status(409).send({ message: "email is not found" });
    }

    const comparePassword = await bcrypt.compare(password, isExisted.password);

    if (!comparePassword) {
      return res.status(409).send({ message: "password is not correct!" });
    }

    res.status(201).send({ message: "user login successfully", isExisted });
  } catch (error) {
    console.error(error);
  }
};
const markattendance = async (req, res) => {
  const user_id = req.params._id;
  console.log("Received POST request for user ID:", user_id);
  const { name, date, status } = req.body;
  console.log(name, date, status);

  try {
    // Check if attendance already marked for the user for the current date
    const existingAttendance = await Attendance.findOne({
      userId: user_id,
      date: date,
    });

    if (existingAttendance) {
      return res
        .status(400)
        .json({ message: "Attendance already marked for today" });
    }
    const newAttendance = new Attendance({
      userId: user_id,
      name: name,
      date: date,
      status: status,
    });

    await newAttendance.save();

    res
      .status(200)
      .json({ message: "Attendance marked successfully", newAttendance });
  } catch (error) {
    console.error("Error marking attendance:", error);
    res.status(500).json({ message: "Error marking attendance" });
  }
};
const addattendance = async (req, res) => {
  // const user_id = req.params._id;
  // console.log("Received POST request for user ID:", user_id);
  const { userId, name, date, status } = req.body;
  console.log(name, date, status);

  try {
    // Check if attendance already marked for the user for the current date
    const existingAttendance = await Attendance.findOne({
      name,
      status,
      userId,
      date,
    });

    if (existingAttendance) {
      return res
        .status(400)
        .json({ message: "Attendance already marked for today" });
    }
    const newAttendance = new Attendance({
      userId,
      name: name,
      date: date,
      status: status,
    });

    await newAttendance.save();

    res
      .status(200)
      .json({ message: "Attendance marked successfully", newAttendance });
  } catch (error) {
    console.error("Error marking attendance:", error);
    res.status(500).json({ message: "Error marking attendance" });
  }
};

// const markattendance = async (req, res) => {
//   try {
//     const user_id = req.params._id;
//     console.log("Received Patch request for user ID:", user_id);
//     const user = await User.findById(user_id);
//     if (!user) {
//       return res.status(404).send({ message: "User not found" });
//     }

//     let { attendance } = req.body;
//     const today = new Date().toISOString().slice(0, 10);
//     console.log(today); // Get today's date in YYYY-MM-DD format
//     const alreadyMarked = user.attendance.some(
//       (entry) => entry.date.slice(0, 10) === today
//     );
//     if (alreadyMarked) {
//       return res
//         .status(400)
//         .send({ message: "Attendance already marked for today" });
//     }
//     console.log(attendance);
//     console.log("db", user);
//     // Check if attendance is a string and parse it if necessary

//     // Check if attendance is an object
//     if (typeof attendance === "object") {
//       console.log("db", user);

//       user.attendance = attendance; // Push the new attendance object to the array

//       await user.save();

//       res.status(201).send({ message: "attendance marked as present" });
//     }
//   } catch (error) {
//     console.error(error);
//   }
// };

const getuser = async (req, res) => {
  try {
    const user_id = req.params._id;
    const user = await User.findById(user_id);
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }
    const name = user.fullName;
    const picture = user.picture;
    console.log(picture);
    res.status(200).send({ user, picture, name });
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).send({ message: "Server error" });
  }
};

const viewattendance = async (req, res) => {
  try {
    const user_id = req.params._id;
    console.log(user_id);
    const attendance = await Attendance.find({ userId: user_id });
    if (!attendance) {
      return res.status(404).send({ message: "User not found" });
    }

    // Ensure attendance is an array
    if (!Array.isArray(attendance)) {
      attendance = [];
    }

    console.log(attendance);
    res.status(200).send({ attendance });
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).send({ message: "Server error" });
  }
};
const viewallattendance = async (req, res) => {
  try {
    // Fetch all users and their attendance records
    const attendanceRecords = await Attendance.find({});

    res.status(200).json(attendanceRecords);
  } catch (error) {
    console.error("Error fetching attendance records:", error);
    res
      .status(500)
      .json({ message: "Error fetching attendance records", error });
  }
};

const applyleave = async (req, res) => {
  try {
    const user_id = req.params._id;
    console.log(user_id);
    const { date } = req.body;
    console.log(date);
    const leaveRequest = new leavesrequest({
      userId: user_id,
      date,
    });
    console.log(leaveRequest);
    await leaveRequest.save();
    res.status(201).send(leaveRequest);
  } catch (error) {
    res.status(500).send({ message: "Error applying for leave", error });
  }
};
const getleaverequest = async (req, res) => {
  try {
    const user_id = req.params._id;
    console.log(user_id);
    const leaveRequests = await leavesrequest.find({ userId: user_id });
    if (!leaveRequests) {
      return res.status(404).send({ message: "User not found" });
    }

    res.status(200).send({ leaveRequests });
  } catch (error) {
    res.status(500).send({ message: "Error fetching leave requests", error });
  }
};

const getallleaverequests = async (req, res) => {
  try {
    const leaveRequests = await leavesrequest
      .find()
      .populate("userId", "fullName email");
    res.status(200).send({ leaveRequests });
  } catch (error) {
    res.status(500).send({ message: "Error fetching leave requests", error });
  }
};
const updateleavestatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const updatedLeaveRequest = await leavesrequest
      .findByIdAndUpdate(id, { status }, { new: true })
      .populate("userId", "fullName email");

    if (!updatedLeaveRequest) {
      return res.status(404).json({ message: "Leave request not found" });
    }

    res.status(200).json(updatedLeaveRequest);
  } catch (error) {
    console.error("Error updating leave status:", error);
    res.status(500).json({ message: "Error updating leave status", error });
  }
};
const generatereport = async (req, res) => {
  const { from, to } = req.query;

  try {
    // Fetch attendance records within the specified date range
    const reportData = await Attendance.find({
      date: { $gte: from, $lte: to },
    });
    res.status(200).json(reportData);
  } catch (error) {
    console.error("Error generating report:", error);
    res.status(500).json({ message: "Error generating report", error });
  }
};

// Function to determine grade based on attended days
// const determineGrade = async (attendedDays) => {
//   const gradeSettings = await GradeSetting.find({});
//   gradeSettings.sort((a, b) => b.days - a.days); // Sort by days in descending order

//   for (let setting of gradeSettings) {
//     if (attendedDays >= setting.days) {
//       return setting.grade;
//     }
//   }
//   return "F";
// };
const determineGrade = (attendedDays) => {
  if (attendedDays >= 26) return "A";
  if (attendedDays >= 20) return "B";
  if (attendedDays >= 15) return "C";
  if (attendedDays >= 10) return "D";
  return "F";
};

const gradesettings = async (req, res) => {
  const { from, to } = req.query;
  console.log(from, to);

  try {
    const attendanceRecords = await Attendance.find({
      date: { $gte: new Date(from), $lte: new Date(to) },
    }).populate("userId", "fullName");

    const studentAttendance = {};

    attendanceRecords.forEach((record) => {
      const userId = record.userId._id;
      if (!studentAttendance[userId]) {
        studentAttendance[userId] = {
          fullName: record.userId.fullName,
          attendedDays: 0,
        };
      }
      if (record.status === "present") {
        studentAttendance[userId].attendedDays += 1;
      }
    });

    const report = Object.values(studentAttendance).map((student) => ({
      fullName: student.fullName,
      attendedDays: student.attendedDays,
      grade: determineGrade(student.attendedDays),
    }));
    console.log(studentAttendance);
    console.log(report);
    res.status(200).json(report);
  } catch (error) {
    console.error("Error generating attendance report:", error);
    res
      .status(500)
      .json({ message: "Error generating attendance report", error });
  }
};
const postgradesettings = async (req, res) => {
  try {
    const gradeSettings = req.body;
    const savedGradeSettings = await GradeSetting.insertMany(gradeSettings);
    res.status(201).json(savedGradeSettings);
  } catch (error) {
    console.error("Error adding grade setting:", error);
    res.status(500).json({ message: "Error adding grade setting", error });
  }
};

const editattendance = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  try {
    const updatedAttendance = await Attendance.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );
    res.status(200).json(updatedAttendance);
  } catch (error) {
    console.error("Error updating attendance record:", error);
    res
      .status(500)
      .json({ message: "Error updating attendance record", error });
  }
};
const deleteattendance = async (req, res) => {
  const { id } = req.params;
  try {
    await Attendance.findByIdAndDelete(id);
    res.status(200).json({ message: "Attendance record deleted" });
  } catch (error) {
    console.error("Error deleting attendance record:", error);
    res
      .status(500)
      .json({ message: "Error deleting attendance record", error });
  }
};

const editpicture = async (req, res) => {
  const user_Id = req.params._id;
  console.log("Received PATCH request for user ID:", user_Id);

  try {
    // Retrieve user record from the database
    const user = await User.findById(user_Id);

    const editpicture = req.file.path;

    if (!user) {
      // If user with the given ID is not found, return 404 Not Found
      return res.status(404).json({ message: "User not found" });
    }
    // Ensure req.file is defined

    // Update user data with the new values from the request body
    console.log(editpicture);
    user.picture = editpicture;
    // Update the name field, you can update other fields similarly

    // Save the updated user record back to the database
    await user.save();
    console.log(user);
    // Send a success response
    res.status(200).json({ message: "User updated successfully", user });
  } catch (error) {
    // If an error occurs, send an error response
    console.error("Error editing user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  adminlogin,
  viewattendance,
  viewallattendance,
  addattendance,
  userlogin,
  userregister,
  markattendance,
  applyleave,
  getallleaverequests,
  updateleavestatus,
  getleaverequest,
  editattendance,
  getuser,
  deleteattendance,
  editpicture,
  generatereport,
  gradesettings,
  postgradesettings,
};
