const Requirement = require("../models/Requirement");
const jwt = require("jsonwebtoken");

const createRequirement = async (req, res) => {
  try {
    const token = req.cookies.token;
    if (!token) return res.status(401).json({ message: "Unauthorized" });
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const reqmt = new Requirement(req.body);
    const saved = await reqmt.save();
    return res.status(201).json(saved);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

const getRequirements = async (req, res) => {
  try {
    const all = await Requirement.find();
    res.json(all);
  } catch (err) {
    res.status(500).json({ error: "Fetching failed" });
  }
};

const getRequirementById = async (req, res) => {
  try {
    const reqmt = await Requirement.findById(req.params.id);
    if (!reqmt) return res.status(404).json({ error: "Requirement not found" });
    res.json(reqmt);
  } catch (err) {
    res.status(500).json({ error: "Lookup failed" });
  }
};

module.exports = { createRequirement, getRequirements, getRequirementById };