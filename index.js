require("dotenv").config();

const express = require("express");
const cors = require("cors");
const pool = require("./db");

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;

/* GET all tickets */
app.get("/tickets", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM tickets");
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

/* GET ticket by ID */
app.get("/tickets/:id", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM tickets WHERE id=$1",
      [req.params.id]
    );
    if (!result.rows[0]) {
      return res.status(404).json({ error: "Ticket not found" });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

/* POST contact message */
app.post("/contact", (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: "All fields are required" });
  }

  console.log(`Contact received: ${name} | ${email} | ${message}`);

  res.json({
    response: `Thank you, ${name}! Your message has been received.`
  });
});

/* Start server */
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});