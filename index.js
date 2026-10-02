const express = require("express");
const app = express();
const rateLimit = require("express-rate-limit");
const connectDB = require("./config/db");
const helmet = require("helmet");
const hpp = require("hpp");
const cors = require("cors");

const { NotFound, VerifyErrors } = require("./middlewares/VerifyErrors");
require("dotenv").config();

// CORS configuration

const allowedOrigins = [
  "http://localhost:5173",
  "https://clothing-store-nu-one.vercel.app",
];

app.use(
  cors({
    origin(origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      callback(null, false);
    },
  }),
);
//Data parsing

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Security middlewares
app.use(helmet());
app.use(hpp());
app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
  }),
);

//CALIING LOGGER MIDDLEWARE
const logger = require("./middlewares/logger");
app.use(logger);

// Connect to database
connectDB();

// Routes
app.use("/api/products", require("./routes/Product"));
app.use("/api/users", require("./routes/Users"));
app.use("/api/auth", require("./routes/auth"));
app.use("/api/orders", require("./routes/Orders"));
app.use("/api/upload", require("./routes/uploadImages"));
app.use("/api/admin", require("./routes/adminDashboard"));
app.use("/api/password", require("./routes/ResetPassword"));

// CALLING ERROR HANDLING MIDDLEWARES
app.use(NotFound);
app.use(VerifyErrors);

// Start the server
app.listen(process.env.PORT, () => {
  console.log("Server is running on port " + process.env.PORT);
});
