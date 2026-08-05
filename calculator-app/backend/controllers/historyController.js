const db = require("../config/db");

// 1. SAVE history (naya calculation add karo)
exports.saveHistory = (req, res) => {
  const { expression, result } = req.body;

  if (!expression || !result) {
    return res
      .status(400)
      .json({ message: "Expression and Result are required" });
  }

  const query = "INSERT INTO history (expression, result) VALUES (?, ?) ";

  db.query(query, [expression, result], (err, data) => {
    if (err) {
      return res.status(500).json({ message: "Server Error", error: err });
    }
    return res
      .status(200)
      .json({ message: "History Saved", id: data.insertId });
  });
};

// 2. GET all history
exports.getHistory = (req, res) => {
  const query = "SELECT * FROM HISTORY ORDER BY created_at DESC";

  db.query(query, (err, data) => {
    if (err) {
      return res.status(500).json({ message: "Server Error", error: err });
    }
    return res.status(200).json({ history: data });
  });
};

// 3. DELETE a history item
exports.deleteHistory = (req, res) => {
  const { id } = req.params;
  const query = "DELETE FROM history WHERE id = ?";

  db.query(query, [id], (err, data) => {
    if (err) {
      return res.status(500).json({ message: "Server Error", error: err });
    }
    return res.status(200).json({ message: "History deleted" });
  });
};
