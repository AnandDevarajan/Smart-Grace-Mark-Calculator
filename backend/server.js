const express = require('express');
const cors = require('cors');
const studentRoutes = require('./routes/student');
const facultyRoutes = require('./routes/faculty');
const adminRoutes = require('./routes/admin');

const app = express();

const PORT = process.env.PORT || 5000;

app.use(express.json({ extended: false }));
app.use(cors());

app.use('/student', studentRoutes);
app.use('/faculty', facultyRoutes);
app.use('/admin', adminRoutes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
