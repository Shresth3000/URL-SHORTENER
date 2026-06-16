const express = require("express");
const path = require("path");
const staticRoute=require("./routes/staticRoute");
const app = express();
app.use(express.static("public"));
const URL = require("./models/url");
const { connectMongoDb } = require("./connection");
const urlRoute = require("./routes/url");
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));
app.use(express.json());
app.use(express.urlencoded({extended:false}));
connectMongoDb("mongodb://127.0.0.1:27017/Short-url-db").then(() =>
  console.log("MongoDb connected!"),
);
app.use("/url", urlRoute);

app.use("/",staticRoute);
app.get("/url/:shortId", async (req, res) => {
  const shortId = req.params.shortId;
  const entry = await URL.findOneAndUpdate(
    {
      shortId,
    },
    {
      $push: {
        visitHistory: { timestamp: Date.now() },
      },
    },
  );
  res.redirect(entry.redirectURL);
});
const PORT = 8001;
app.listen(PORT, () => console.log("Server started at Port: ", PORT));
