const express = require("express")
const router = express.Router()

// IMPORT CONTROLLERS
const {
  createBlog,
  getBlogs,
  getBlog,
  updateBlog,
  deleteBlog,
  getUserBlogs,
} = require("../controllers/blogs")

// IMPORT AUTH MIDDLEWARE
const { protect, checkBlogOwnership } = require("../middleware/auth")

// IMPORT MULTER (image upload)
const upload = require("../middleware/upload")

// PUBLIC ROUTES
router.get("/", getBlogs)

// PRIVATE ROUTES
router.get("/user", protect, getUserBlogs)

// Create blog (private, with image upload)
router.post("/", protect, upload.single("image"), createBlog)

// Blog specific routes
router
  .route("/:id")
  .get(getBlog)
  .put(protect, checkBlogOwnership, upload.single("image"), updateBlog)
  .delete(protect, checkBlogOwnership, deleteBlog)

module.exports = router