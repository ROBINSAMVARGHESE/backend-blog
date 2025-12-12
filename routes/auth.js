const express = require("express")
const router = express.Router()

// Controllers
const { register, login, getMe } = require("../controllers/auth")

// Middleware
const { protect } = require("../middleware/auth")

// Routes
router.post("/register", register)
router.post("/login", login)
router.get("/me", protect, getMe)

module.exports = router

