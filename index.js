const express = require("express");
const path = require("path");
const app = express();
const URL = require("./models/url");
const { connectMongoDb } = require("./connection");
const urlRoute = require("./routes/url");
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));
app.use(express.json());

connectMongoDb("mongodb://127.0.0.1:27017/Short-url-db").then(() =>
  console.log("MongoDb connected!"),
);
app.use("/url", urlRoute);

app.get("/test", async (req, res) => {
  const allUrls = await URL.find({});
  res.render("home",{
    urls: allUrls,
  });
});
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
