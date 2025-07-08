const express = require('express');
const multer = require('multer');
const path = require('path');
const { uploadDocument } =  require('../controllers/documentControllers');
const router = express.Router();
const checkAuth = require("../middlewares/checkAuth");

// Setup for file uploads
const upload = multer({ dest: 'uploads/' });

// Route to handle document upload
router.post('/upload', checkAuth, upload.array('files'), uploadDocument);

module.exports = router;