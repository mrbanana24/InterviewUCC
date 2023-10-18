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
app_micro.use(cors());

// Config dotenv
require("dotenv").config();

// Routes
const routes = require("./routes/routes.js");
const routes_micro = require("./routes/micro-service.js");
app.use("/", routes);
app_micro.use("/", routes_micro);

// Error handler middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something went wrong" });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});

app_micro.listen(port_micro, () => {
  console.log(`Server is listening on port ${port_micro}`);
});
