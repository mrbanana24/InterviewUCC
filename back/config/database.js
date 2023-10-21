const mongoose = require("mongoose");

const connectDB = async () => {
  const dbUrl =
    process.env.DATABASE_URL ||
    "mongodb+srv://franpercivaldi:mansanita15@cluster0.l9ev6yl.mongodb.net/";
  mongoose
    .connect(dbUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.log(err));
};

module.exports = connectDB;
