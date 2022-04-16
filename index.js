const express = require("express");
const dbConnect = require("./config/dbconnect");
const error = require("./middlewares/errorMiddlewares-Handler");
const usersRoute = require("./Routes/usersRoute");
const dotenv = require("dotenv");
const movieRoute = require("./routes/movieRoute");
const cors = require("cors");

dotenv.config();
const app = express();

// DB Connect
dbConnect();

app.use(cors());
// Passing BODY Data
app.use(express.json());

// ROUTES
// Users
app.use("/api/users", usersRoute);
// Books
app.use("/api/movies", movieRoute);

// Error middleware
app.use(error.errorMiddlewareHandler);

// SERVER
const PORT = process.env.PORT || 9000;
app.get("/", (req, res) => {
  res.send("HELLO WORLD WELCOME");
});

app.listen(PORT, () => console.log("App is Started", PORT));
