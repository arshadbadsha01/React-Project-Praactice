const express = require("express");
const {
  saveHistory,
  getHistory,
  deleteHistory,
} = require("../controllers/historyController");

const router = express.Router();

router.post("/save", saveHistory);
router.get("/all", getHistory);
router.delete("/:id", deleteHistory);

module.exports = router;
