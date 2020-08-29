const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const checkAuth = require("../middleware/check-auth");
const PostsController = require("../controllers/posts");

router.get("/", PostsController.posts_get_all);

router.post("/", checkAuth, PostsController.posts_create_post);

router.get("/:postId", PostsController.posts_get_one);

router.delete("/:postId", checkAuth, PostsController.posts_delete_post);

router.patch("/:postId",  checkAuth, PostsController.posts_edit_post);
module.exports = router;
