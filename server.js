const dotenv = require("dotenv")
dotenv.config()

const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const path = require("path")

const authRoutes = require("./routes/auth")
const blogRoutes = require("./routes/blogs")
const commentRoutes = require("./routes/comments")
const userRoutes = require("./routes/users")

const app = express()

app.use(express.json({ limit: "50mb" }))
app.use(cors())
app.use("/uploads", express.static(path.join(__dirname, "uploads")))

console.log("MONGODB_URI:", process.env.MONGODB_URI)

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err))

app.use("/api/auth", authRoutes)
app.use("/api/blogs", blogRoutes)
app.use("/api/comments", commentRoutes)
app.use("/api/users", userRoutes)

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))

