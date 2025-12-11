const express = require("express");
const router = express.Router();

// IMPORT CONTROLLER
const {
  createBlog,
  getBlogs,
  getBlog,
  updateBlog,
  deleteBlog,
  getUserBlogs,
} = require("../controllers/blogs");

// IMPORT AUTH MIDDLEWARE
const { protect } = require("../middleware/auth");

// IMPORT MULTER (image upload)
const upload = require("../middleware/upload");

// ------------------------
// PUBLIC ROUTES
// ------------------------
router.get("/", getBlogs);      

// ------------------------
// PRIVATE ROUTES
// ------------------------
router.get("/user", protect, getUserBlogs); 

router.post("/", protect, upload.single("image"), createBlog); 
router.put("/:id", protect, updateBlog);
router.delete("/:id", protect, deleteBlog);

router.get("/:id", getBlog); 

module.exports = router;
