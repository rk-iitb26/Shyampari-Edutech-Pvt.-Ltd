const mongoose = require("mongoose");

const teacherSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  mobile: { type: String, required: true },
  gender: { type: String, required: true },
  education: {
    twelfth: { type: String, required: true },
    graduation: { type: String, required: true },
    postGraduation: { type: String, required: true },
  },
  subjects: [{ type: String }],
  role: { type: String, default: "teacher" },
  mode: { type: String, enum: ["Online", "Offline", "Both"] },
  location: {
    country: { type: String, default: "India" },
    state: { type: String },
    district: { type: String },
  },
}, { timestamps: true });

module.exports = mongoose.model("Teacher", teacherSchema);
