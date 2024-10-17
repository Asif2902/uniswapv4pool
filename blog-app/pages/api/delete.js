import sqlite3 from "sqlite3";
import fs from "fs";
import path from "path";
const db = new sqlite3.Database("./blog.db");
export default async function handler(req, res) {
  if (req.method === "POST") {
    const { id, postKey, moderatorKey } = req.body;
    db.get("SELECT * FROM blogs WHERE id = ?", [id], (err, row) => {
      if (err || !row) return res.status(404).send({ error: "Blog not found" });
      if (row.post_key === postKey || row.moderator_key === moderatorKey) {
        if (row.file_path) {
          fs.unlink(path.join("uploads", row.file_path), (err) => {
            if (err) console.error("Failed to delete file:", err);
          });
        }
        db.run("DELETE FROM blogs WHERE id = ?", [id], (err) => {
          if (err) return res.status(500).send({ error: err.message });
          res.json({ message: "Blog deleted" });
        });
      } else {
        res.status(403).send({ error: "Invalid key" });
      }
    });
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
