const config = require('../config/db');
const con = config.con;

exports.getAllCourses = (req, res) => {
  con.query(`SELECT * FROM COURSE`, (err, result) => {
    if (result.length === 0 || err) {
      return res.status(400).json({
        message: 'No Courses found',
      });
    }
    return res.json({
      courses: result,
    });
  });
};
