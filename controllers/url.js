const { nanoid } = require("nanoid");
const URL = require("../models/url");
const { response } = require("express");

async function handleGenerateNewShortURL(req, res) {
  const body = req.body;

  if (!body.url) {
    return res.status(400).json({ error: "URL is required" });
  }

  // Check if URL already exists
  const existingURL = await URL.findOne({
    redirectURL: body.url,
  });

  // If found, return the existing short ID
  if (existingURL) {
    return res.render("home", {
      id: existingURL.shortId,
    });
  }

  // Otherwise create a new one
  const shortID = nanoid(8);

  await URL.create({
    shortId: shortID,
    redirectURL: body.url,
    visitHistory: [],
  });

  return res.render("home", {
    id: shortID,
  });
}
async function handleGetAnalytics(req, res) {
  const shortId = req.params.shortId;
  const result = await URL.findOne({ shortId });
  return res.json({
    totalClicks: result.visitHistory.length,
    analytics: result.visitHistory,
  });
}
module.exports = {
  handleGenerateNewShortURL,
  handleGetAnalytics,
};
