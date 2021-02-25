const config = require('../config/db');
const con = config.con;

exports.getAllCourses = (req, res) => {
  con.query(`SELECT * FROM COURSE`, (err, result) => {
    if (err) {
      return res.status(400).json({
        error: 'No Courses found',
      });
    }
    return res.json({
      courses: result,
    });
  });
};
