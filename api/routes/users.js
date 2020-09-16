const express = require("express");
const router = express.Router();
const multer = require("multer");
 
const checkAuth = require("../middleware/check-auth");


const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, "./uploads/users");
  },
  filename: function(req, file, cb) {
    const now = new Date().toISOString();
    const date = now.replace(/:/g, "-");
    cb(null, date + file.originalname);
  },
});
const fileFilter = (req, file, cb) => {
  // accept a file
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    cb(null, true);
  } else {
    //reject a file
    cb(null, false);
  }
};
const upload = multer({
  storage: storage,
  limits: { fileSize: 1024 * 1024 * 5 },
});

const UsersController = require("../controllers/users");
router.get("/", UsersController.users_get_all);

router.post(
  "/signup",
  upload.single("userImage"),
  UsersController.users_signup
);

router.get("/:userId", checkAuth, UsersController.users_get_one);

router.post("/login", UsersController.users_login);

router.delete("/:userId", UsersController.users_delete_user); // odluci naknadno ima li smisla ovime se bavit jer triba onda i njegove plaze brisat

router.patch("/:userId", UsersController.users_edit_user);
router.patch("/:userId/userImage",checkAuth, upload.single("userImage"), UsersController.users_edit_image);
router.put("/addLiked", checkAuth, UsersController.users_addliked);
router.put("/removeLiked", checkAuth, UsersController.users_removeliked);

module.exports = router;

