const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const Auth = require("../models/auth");
module.exports = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("db is connected");
    // Check if the admin user already exists
    const existingAdmin = await Auth.findOne({ email: "admin@gmail.com" });
    if (existingAdmin) {
      console.log("Admin user already exists. Skipping seeding.");
      return;
    }
    const hashedPassword = await bcrypt.hash("adminpassword", 10);

    const auth = new Auth({
      fullName: "admin",
      email: "admin@gmail.com",
      password: hashedPassword,
      role: "admin",
    });

    await auth.save();
    console.log("Admin user seeded successfully");
  } catch (err) {
    console.error("Error seeding admin user:", err);
  }
};

// const mongoose = require("mongoose");
// const bcrypt = require("bcryptjs");
// const Auth = require("../models/auth");

// const connectDB = async () => {
//   try {
//     await mongoose.connect(process.env.MONGODB_URL);
//     console.log("db is connected");
//   } catch (err) {
//     console.error("Error connecting to MongoDB:", err);
//   }
// };

// const seedAdmin = async () => {
//   try {
//     const hashedPassword = await bcrypt.hash("123", 10);

//     const auth = new Auth({
//       fullName: "admin",
//       email: "admin@gmail.com",
//       password: hashedPassword,
//       role: "admin",
//     });

//     await auth.save();
//     console.log("Admin user seeded successfully");
//   } catch (err) {
//     console.error("Error seeding admin user:", err);
//   }
// };

// module.exports = { connectDB, seedAdmin };
