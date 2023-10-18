const mongoose = require("mongoose");

const connectDB = async () => {
  const dbUrl =
    process.env.DATABASE_URL || "mongodb://localhost:27017/interviewUCC";
  mongoose
    .connect(dbUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.log(err));
};

module.exports = connectDB;
