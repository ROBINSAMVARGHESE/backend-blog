const dotenv = require("dotenv");
dotenv.config();   // ✅ load .env FIRST

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

// Routes
const authRoutes = require("./routes/auth");
const blogRoutes = require("./routes/blogs");
const commentRoutes = require("./routes/comments");
const userRoutes = require("./routes/users");

const app = express();

// Middleware
app.use(express.json({ limit: "50mb" }));
app.use(cors());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Debug log (optional)
console.log("MONGODB_URI:", process.env.MONGODB_URI);

// MongoDB Connection
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,          
    useUnifiedTopology: true,       
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/blogs", blogRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/users", userRoutes);

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
