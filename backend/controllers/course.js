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

exports.addCourseMarks = (req, res) => {
  let id = req.params.id;
  const { cid, total, internals, marks } = req.body;
  con.query(
    `INSERT INTO COURSE_MARK (RollNum,CourseID,Internals,Marks,Total) VALUES (?,?,?,?,?)`,
    [id, cid, internals, marks, total],
    (err, result) => {
      if (err || result.length === 0) {
        return res.json({
          message: 'Unable to update request',
        });
      }
      if (result) {
        con.query(`SELECT * FROM COURSE_MARK'`, (err, result) => {
          if (err || result.length === 0) {
            return res.status(400).json({
              message: 'No students found',
            });
          }
          return res.json({
            markList: result,
          });
        });
      }
    }
  );
};

exports.getCourseMark = (req, res) => {
  const id = req.params.id;
  con.query(
    `SELECT * FROM COURSE_MARK WHERE CourseID=?`,
    [id],
    (err, result) => {
      if (result.length === 0 || err) {
        return res.status(400).json({
          message: 'No Courses found',
        });
      }
      return res.json({
        courseMarkList: result,
      });
    }
  );
};
