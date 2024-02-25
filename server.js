const express = require("express");
const colors = require("colors");
const moragan = require("morgan");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const jwt = require('jsonwebtoken');
const bodyParser = require("body-parser");
const cors = require("cors");

//dotenv conig
dotenv.config();

//mongodb connection
connectDB();

//rest obejct
const app = express();

//middlewares
app.use(cors);
app.use(express.json());
app.use(moragan("dev"));

// Middleware to parse JSON request bodies
app.use(bodyParser.json());

app.use("/api/user", require("./routes/userRoutes"))
app.use("/api/admin", require("./routes/adminRoutes"));
app.use("/api/doctor", require("./routes/doctorRoutes"));

//port
const port = process.env.PORT || 8081;
//listen port
app.listen(port, () => {
  console.log(
    `Server Running on port ${port}`
      
  );
});