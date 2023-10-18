const express = require("express");
const app = express();
const app_micro = express();
const port = 8000;
const port_micro = 8001;
const cors = require("cors");

// Middlewares
app.use(express.json());

// Connect to database
const connectDB = require("./config/database");
connectDB();

// Config CORS
app.use(cors());

// Config dotenv
require("dotenv").config();

// Routes
const routes = require("./routes/routes.js");
app.use("/", routes);

// Error handler middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something went wrong" });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
