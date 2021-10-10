// Imports of the necessary packages
const express = require("express"); // The Express Module for creating the API
const cors = require("cors"); // For Cross Origin Resource Sharing
const mongoose = require("mongoose"); // For Connecting MongoDB To The Application
require("dotenv").config(); // For Accessing Secret Values From The .env File

// User Defined Variables
const app = express();
const PORT = process.env.PORT || 8000; // The Port on which the server will run

// Middlewares
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

app.use("/api", require("./routes/quiz.routes"));

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("[DB]... Successfully connected to the Database 🙌"))
  .catch((e) => console.log("[DB]... Failed to Connect to the Database 💔"));

// An Initial Route For The API
app.get("/", (req, res) => {
  res.status(200).json({ message: "The API is running successfully 🚀" });
});

// Starting the Server
app.listen(PORT, () => {
  console.log(`[APP]... The API is successfully running on PORT ${PORT} 🚀`);
});
