const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();

const MONGODB_URL = require("./config/mongodb");

const movieRoutes = require("./routes/movies");
const actorRoutes = require("./routes/actors");

mongoose
  .connect(MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log("bağlandik"))
  .catch(err => console.log("error:", err));

app.use(express.json());

app.use("/movies", movieRoutes);
app.use("/actors", actorRoutes);
app.use(cors());

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`server bağlanti ${PORT}`));
