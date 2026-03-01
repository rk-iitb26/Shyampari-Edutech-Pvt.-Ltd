const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const User = require("./models/User");
const Student = require("./models/Student");
const Teacher = require("./models/Teacher");

const uri = "mongodb+srv://Admin:Admin%40deva@cluster0.1eyku4m.mongodb.net/shampari_edutech?retryWrites=true&w=majority&appName=Cluster0";

const statesAndDistricts = [
    { state: "Maharashtra", districts: ["Mumbai", "Pune", "Nagpur", "Thane"] },
    { state: "Telangana", districts: ["Hyderabad", "Warangal", "Nizamabad", "Karimnagar"] },
    { state: "Karnataka", districts: ["Bengaluru", "Mysuru", "Mangaluru", "Hubballi"] },
    { state: "Tamil Nadu", districts: ["Chennai", "Coimbatore", "Madurai", "Salem"] },
    { state: "Delhi", districts: ["New Delhi", "North Delhi", "South Delhi"] },
    { state: "Uttar Pradesh", districts: ["Lucknow", "Kanpur", "Varanasi", "Agra"] },
    { state: "Gujarat", districts: ["Ahmedabad", "Surat", "Vadodara", "Rajkot"] },
    { state: "West Bengal", districts: ["Kolkata", "Howrah", "Darjeeling"] },
];

const subjectsList = ["Mathematics", "Physics", "Chemistry", "Biology", "English", "History", "Geography", "Computer Science", "Economics", "Accounts"];
const modes = ["Online", "Offline"]; // Note: Teacher allows 'Both' as well, but Student allows 'Online', 'Offline'
const teacherModes = ["Online", "Offline", "Both"];
const genders = ["Male", "Female"];
const courses = ["10th Grade", "12th Grade", "B.Tech", "B.Sc", "B.Com", "M.Tech", "MBA"];

const randomElement = (arr) => arr[Math.floor(Math.random() * arr.length)];
const randomSubjects = () => {
    const shuffled = subjectsList.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, Math.floor(Math.random() * 3) + 1); // 1 to 3 subjects
};
const randomPhone = () => Math.floor(7000000000 + Math.random() * 2999999999).toString();

const generateData = async () => {
    try {
        await mongoose.connect(uri);
        console.log("Connected to MongoDB for seeding...");

        const passwordHash = await bcrypt.hash("Password@123", 10);

        const studentsToInsert = [];
        const usersToInsert = [];

        // Generate 50 Students
        for (let i = 1; i <= 50; i++) {
            const email = `student${i}_${Date.now()}@test.com`;
            const fullName = `Student ${i} Name`;

            const user = new User({
                fullName,
                email,
                password: passwordHash,
                role: "student",
            });
            usersToInsert.push(user);

            const loc = randomElement(statesAndDistricts);
            const district = randomElement(loc.districts);

            studentsToInsert.push({
                user: user._id, // Reference to User document
                mobile: randomPhone(),
                course: randomElement(courses),
                mode: randomElement(modes),
                subjects: randomSubjects(),
                location: {
                    state: loc.state,
                    district: district,
                },
                gender: randomElement(genders),
                standard: randomElement(["10th", "11th", "12th", "College"]),
                board: randomElement(["CBSE", "ICSE", "State Board"]),
            });
        }

        // Generate 50 Teachers
        const teachersToInsert = [];
        for (let i = 1; i <= 50; i++) {
            const email = `teacher${i}_${Date.now()}@test.com`;
            const fullName = `Faculty ${i} Name`;

            const user = new User({
                fullName,
                email,
                password: passwordHash,
                role: "faculty",
            });
            usersToInsert.push(user);

            const loc = randomElement(statesAndDistricts);
            const district = randomElement(loc.districts);

            teachersToInsert.push({
                user: user._id, // Reference object as defined in Teacher schema
                mobile: randomPhone(),
                gender: randomElement(genders),
                education: {
                    twelfth: "State Board 90%",
                    graduation: randomElement(["B.Tech", "B.Sc", "B.A", "B.Com"]),
                    postGraduation: randomElement(["M.Tech", "M.Sc", "M.A", "None"]),
                },
                subjects: randomSubjects(),
                role: "teacher",
                mode: randomElement(teacherModes),
                location: {
                    country: "India",
                    state: loc.state,
                    district: district,
                },
            });
        }

        // Insert to DB
        console.log("Saving users...");
        await User.insertMany(usersToInsert);

        console.log("Saving students...");
        await Student.insertMany(studentsToInsert);

        console.log("Saving teachers...");
        await Teacher.insertMany(teachersToInsert);

        console.log("Successfully seeded 50 students and 50 teachers!");
        process.exit(0);
    } catch (error) {
        console.error("Error seeding data:", error);
        process.exit(1);
    }
};

generateData();
