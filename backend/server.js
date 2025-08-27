const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const authRoutes = require('./routes/auth');

const app = express();
const PORT = process.env.PORT || 5000;

// --- DATABASE CONNECTION ---
// Using your provided MongoDB Atlas connection string
const MONGO_URI = "mongodb+srv://mogilicharlasiddhardharoy:Roy%409876@shyampariedutech.v6lorfo.mongodb.net/shyampariedutech?retryWrites=true&w=majority&appName=shyampariedutech";

// Note: I have URL-encoded your password from 'Roy@9876' to 'Roy%409876'
// and specified 'shyampariedutech' as the database name.

mongoose.connect(MONGO_URI)
  .then(() => console.log('MongoDB Connected Successfully!'))
  .catch(err => console.error('MongoDB Connection Error:', err));

// --- MIDDLEWARE ---
app.use(cors());
app.use(express.json());

// --- ROUTES ---
app.use('/api/auth', authRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});