import sqlite3 from "sqlite3";
const db = new sqlite3.Database("./blog.db");
export default async function handler(req, res) {
  if (req.method === "GET") {
    db.all("SELECT id, title, content FROM blogs", [], (err, rows) => {
      if (err) return res.status(500).send({ error: err.message });
      res.json(rows);
    });
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
