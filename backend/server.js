const express = require('express');
const config = require('./config/db');
const app = express();
const con = config.con;

const PORT = process.env.PORT || 8000;

app.use(express.json({ extended: false }));
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
