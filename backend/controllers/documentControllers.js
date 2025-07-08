const Document = require("../models/Document");
const jwt = require("jsonwebtoken");

const createDocument = async (req, res) => {
  try {
    const token = req.cookies.token;
    if (!token) return res.status(401).json({ message: "Unauthorized" });
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const doc = new Document({ ...req.body, uploadedBy: decoded._id });
    const saved = await doc.save();
    return res.status(201).json(saved);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

const getDocuments = async (req, res) => {
  try {
    const docs = await Document.find().populate("uploadedBy");
    res.json(docs);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch documents" });
  }
};

const getDocumentById = async (req, res) => {
  try {
    const doc = await Document.findById(req.params.id).populate("uploadedBy");
    if (!doc) return res.status(404).json({ error: "Document not found" });
    res.json(doc);
  } catch (err) {
    res.status(500).json({ error: "Error retrieving document" });
  }
};

const deleteDocument = async (req, res) => {
  try {
    const token = req.cookies.token;
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.role !== "admin") return res.status(403).json({ message: "Forbidden" });

    await Document.findByIdAndDelete(req.params.id);
    res.json({ message: "Document deleted" });
  } catch (err) {
    res.status(500).json({ error: "Deletion failed" });
  }
};

module.exports = {
  createDocument,
  getDocuments,
  getDocumentById,
  deleteDocument
};