const express = require("express");
const cors = require("cors");
const path = require("path");
const studentRoutes = require("./routes/student");
const facultyRoutes = require("./routes/faculty");
const adminRoutes = require("./routes/admin");
const courseRoutes = require("./routes/course");
const gracemarkRoutes = require("./routes/gracemark");

const app = express();

const PORT = process.env.PORT || 5000;

app.use(express.json({ extended: false }));
app.use(cors());

app.use("/student", studentRoutes);
app.use("/faculty", facultyRoutes);
app.use("/admin", adminRoutes);
app.use("/course", courseRoutes);
app.use("/gracemark", gracemarkRoutes);

const dirname = path.resolve();

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(dirname, "/frontend/build")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(dirname, "frontend", "build", "index.html"));
  });
}

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
