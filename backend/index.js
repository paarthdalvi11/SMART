const express = require('express');
const mongoose = require('mongoose');
const app = express();
const db = require("./db");
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
}));

app.use(express.json());

app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/documents', require('./routes/documentRoutes'));
app.use('/api/agents', require('./routes/agentOutputRoutes'));
app.use('/api/requirements', require('./routes/requirementRoutes'));
app.use('/api/versions', require('./routes/versionRoutes'));

app.listen(3000, () => console.log('Server running on port 3000'));
