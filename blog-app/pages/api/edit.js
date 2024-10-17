import sqlite3 from "sqlite3";
const db = new sqlite3.Database("./blog.db");
export default async function handler(req, res) {
  if (req.method === "POST") {
    const { id, title, content, postKey } = req.body;
    db.get("SELECT * FROM blogs WHERE id = ?", [id], (err, row) => {
      if (err || !row) return res.status(404).send({ error: "Blog not found" });
      if (row.post_key !== postKey) return res.status(403).send({ error: "Invalid key" });
      db.run("UPDATE blogs SET title = ?, content = ? WHERE id = ?", [title, content, id], (err) => {
        if (err) return res.status(500).send({ error: err.message });
        res.json({ message: "Blog updated" });
      });
    });
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
