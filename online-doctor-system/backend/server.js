// backend/server.js
const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const doctorRoutes = require("./routes/doctorRoutes");
const patientRoutes = require("./routes/patientRoutes");
const adminRoutes = require("./routes/adminRoutes");
const cors = require("cors");
const availabilityRoutes = require("./routes/availabilityRoutes");
const appointmentRoutes = require("./routes/appointmentRoutes");
const cardRoutes = require("./routes/cardRoutes");


require('dotenv').config()
console.log("JWT_SECRET at startup:", process.env.JWT_SECRET);


connectDB();

const app = express();
app.use(cors());
app.use(express.json());


app.use("/api/auth", authRoutes);
app.use("/api/doctor", doctorRoutes);
app.use("/api/patient", patientRoutes);
app.use("/api/admin", adminRoutes);

app.use('/api/availability', availabilityRoutes);
app.use('/api/appointments', appointmentRoutes);
app.use('/api/cards', cardRoutes);

app.get("/", (req, res) => res.send("Online Doctor System API"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
