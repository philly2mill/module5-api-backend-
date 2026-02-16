const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

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

// Contact route (POST)
app.post("/contact", (req, res) => {
  const { name, email, message } = req.body;
  if (!name || !email || !message) {
    return res.status(400).send({ error: "All fields are required" });
  }
  res.send({ response: `Thank you, ${name}! Your message has been received.` });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
