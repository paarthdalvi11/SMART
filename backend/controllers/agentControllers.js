const AgentOutput = require("../models/AgentOutput");
const jwt = require("jsonwebtoken");

const createAgentOutput = async (req, res) => {
  try {
    const token = req.cookies.token;
    if (!token) return res.status(401).json({ message: "Unauthorized" });
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.role !== "admin" && decoded.role !== "agent") return res.status(403).json({ message: "Forbidden" });
    const ao = new AgentOutput(req.body);
    const saved = await ao.save();
    return res.status(201).json(saved);
  } catch (e) {
    return res.status(400).json({ error: e.message });
  }
};

const getAgentOutputs = async (req, res) => {
  try {
    const outputs = await AgentOutput.find();
    res.json(outputs);
  } catch (e) {
    res.status(500).json({ error: "Error retrieving agent outputs" });
  }
};

const getAgentOutputById = async (req, res) => {
  try {
    const output = await AgentOutput.findById(req.params.id);
    if (!output) return res.status(404).json({ error: "Output not found" });
    res.json(output);
  } catch (e) {
    res.status(500).json({ error: "Error retrieving output" });
  }
};

module.exports = { createAgentOutput, getAgentOutputs, getAgentOutputById };