const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const UserRoutes = require("./routes/userRoutes")
const cors =require('cors')
const cookieParser = require('cookie-parser')
dotenv.config();
connectDB();

const app = express();
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:3000',  // Allow only requests from this origin
  methods: ['GET', 'POST'],          // Allow specific HTTP methods
  credentials: true                  // Allow credentials (cookies, auth headers)
}));
app.use('/auth', UserRoutes);
app.use('/users',UserRoutes)

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
