// const mongoose = require("mongoose");

// const studentSchema = new mongoose.Schema({
//     user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
//     mobile: { type: String, required: true },
//     gender: { type: String },
//     standard: { type: String },
//     board: { type: String },
//     subjects: [{ type: String }],
//     mode: { type: String, enum: ["Online", "Offline", "Both"] },
//     location: {
//         country: { type: String },
//         state: { type: String },
//         district: { type: String }
//     }
// }, { timestamps: true });

// module.exports = mongoose.model("Student", studentSchema);
const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  mobile: String,
  course: String,
  mode: { type: String, enum: ["Online", "Offline"], default: "Online" },
  subjects: [String],
  location: {
    state: String,
    district: String
  }
}, { timestamps: true });

module.exports = mongoose.model("Student", studentSchema);
