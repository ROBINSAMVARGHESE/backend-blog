const jwt = require("jsonwebtoken")
const User = require("../models/User")
const Blog = require("../models/Blog")

// Protect routes
exports.protect = async (req, res, next) => {
  let token

  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1]
  }

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Not authorized to access this route",
    })
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    // Attach full user object (without password) to req.user
    req.user = await User.findById(decoded.id).select("-password")

    // Optional debug logging controlled by DEBUG_AUTH env var
    if (process.env.DEBUG_AUTH === "true") {
      console.log("[auth] token:", token)
      console.log("[auth] decoded:", decoded)
      console.log("[auth] req.user id:", req.user && req.user.id)
    }

    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Not authorized to access this route",
      })
    }

    next()
  } catch (err) {
    return res.status(401).json({
      success: false,
      message: "Not authorized to access this route",
    })
  }
}


// Check if user is blog owner
exports.checkBlogOwnership = async (req, res, next) => {
  try {
    const blog = await Blog.findById(req.params.id)
    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found",
      })
    }

    // req.user is a user object; compare ids as strings
    if (blog.author.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: "Not authorized to update this blog",
      })
    }

    next()
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Server error",
    })
  }
}

