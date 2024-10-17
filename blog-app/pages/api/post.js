import { generateKey } from "../../utils/crypto";
import sqlite3 from "sqlite3";
const db = new sqlite3.Database("./blog.db");
export default async function handler(req, res) {
  if (req.method === "POST") {
    const { title, content } = req.body;
    const postKey = generateKey();
    db.get("SELECT COUNT(*) as count FROM blogs", (err, row) => {
      let moderatorKey = null;
      if (row.count === 0) {
        moderatorKey = generateKey();
      }
      db.run("INSERT INTO blogs (title, content, post_key, moderator_key) VALUES (?, ?, ?, ?)",
        [title, content, postKey, moderatorKey],
        function(err) {
          if (err) return res.status(500).send({ error: err.message });
          res.json({ message: "Blog posted", postKey, moderatorKey });
        }
      );
    });
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
