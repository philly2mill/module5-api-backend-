const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors()); // 👈 THIS FIXES YOUR ISSUE
app.use(express.json());

// Homepage route
app.get("/", (req, res) => {
  res.send({ message: "Module 5 API backend is running!" });
});

// Services route
app.get("/services", (req, res) => {
  res.send({
    services: [
      "Frontend Hosting",
      "Backend API",
      "Database Connection",
      "Deployment Pipelines"
    ]
  });
});

// Contact route
app.post("/contact", (req, res) => {
  console.log(req.body); // helpful debug

  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: "All fields are required" });
  }

  res.json({
    response: `Thank you, ${name}! Your message has been received.`
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

