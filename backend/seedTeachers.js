const fs = require("fs");
const csv = require("csv-parser");
const mongoose = require("mongoose");
require("dotenv").config();

const Teacher = require("./models/Teacher");

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("DB Connected"));

const teachers = [];

fs.createReadStream("teachers.csv")
  .pipe(csv())
  .on("data", (row) => {
    teachers.push({
      mobile: row.mobile,
      gender: row.gender,

      education: {
        twelfth: row.twelfth,
        graduation: row.graduation,
        postGraduation: row.postGraduation,
      },

      subjects: row.subjects.split(","),

      mode: row.mode,

      location: {
        country: "India",
        city: row.city,        // ✅ city only
      },
    });
  })
  .on("end", async () => {
    try {
      await Teacher.insertMany(teachers);
      console.log("✅ Teachers inserted!");
      process.exit();
    } catch (err) {
      console.error(err);
      process.exit(1);
    }
  });