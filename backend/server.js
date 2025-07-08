const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.json());
const cookieParser = require("cookie-parser");
app.use(cookieParser());
const cors = require("cors");


const dotenv = require('dotenv');
dotenv.config();
const db = require('./db');

const taskRoutes = require("./routes/taskRoutes");
app.use('/task', taskRoutes);
const userRoutes = require("./routes/userRoutes");
app.use('/user', userRoutes);
const documentRoutes = require("./routes/documentRoutes");
app.use('/files', documentRoutes);

const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})