const express = require('express');
const cors = require('cors');
const studentRoutes = require('./routes/student');

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json({ extended: false }));
app.use(
  cors({
    origin: ['http://localhost:3000'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
  })
);

app.use('/student', studentRoutes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
