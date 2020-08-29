const express = require("express");
const router = express.Router();
const checkAuth = require("../middleware/check-auth");

const multer = require("multer");

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, "./uploads/beaches");
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

const { update } = require("../models/beach"); // cemu ovo???
const BeachesController = require("../controllers/beaches");

router.get("/", BeachesController.beaches_get_all); //get method handles incoming get req

router.post(
  "/",
  checkAuth,
  upload.single("beachImage"),
  BeachesController.beaches_create_beach
); //post method handles incoming get req

router.get("/:beachId", BeachesController.beaches_get_one); //express syntax for variables :variable

router.patch("/:beachId", checkAuth, BeachesController.beaches_edit_beach);

router.delete("/:beachId", checkAuth, BeachesController.beaches_delete_beach);
module.exports = router;
