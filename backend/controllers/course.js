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

exports.getAllDeptCourses = (req, res) => {
  const id = req.params.id;
  con.query(
    `SELECT * FROM COURSE WHERE Department=? OR Department='ALL'`,
    [id],
    (err, result) => {
      if (result.length === 0 || err) {
        return res.status(400).json({
          message: 'No Courses found',
        });
      }
      return res.json({
        courses: result,
      });
    }
  );
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
          message: 'Unable to Update Marks',
        });
      }
      return res.json({
        message: 'Successfully Updated',
      });
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
        markList: result,
      });
    }
  );
};

exports.getACourseMark = (req, res) => {
  const id = req.params.id;
  let n = id.length;
  let rollno = id.substring(0, n - 9);
  let courseid = id.substring(n - 8, n);

  con.query(
    `SELECT * FROM COURSE_MARK WHERE CourseID=? and RollNum=?`,
    [courseid, rollno],
    (err, result) => {
      if (result.length === 0 || err) {
        return res.status(400).json({
          message: 'No Marks found',
        });
      }
      return res.json({
        markList: result,
      });
    }
  );
};

exports.updateCourseMarkDetails = (req, res) => {
  const cid = req.params.id;
  const { internals, marks, id } = req.body;
  console.log(internals, marks);
  con.query(
    `SELECT * FROM COURSE_MARK WHERE CourseID=? and RollNum=?`,
    [cid, id],
    (err, result) => {
      if (err || result.length === 0) {
        return res.status(400).json({
          message: 'No course marks Found',
        });
      }
      if (result) {
        result[0].Internals = internals || result[0].Internals;
        result[0].Marks = marks || result[0].Marks;
        result[0].Total =
          parseInt(result[0].Internals) + parseInt(result[0].Marks);
        con.query(
          `UPDATE COURSE_MARK SET Internals=?,Marks=?,Total=? WHERE CourseID=? AND RollNum=?`,
          [result[0].Internals, result[0].Marks, result[0].Total, cid, id],
          (err, result) => {
            if (err || result.length === 0) {
              return res.status(400).json({
                message: 'Failed to update',
              });
            }
            return res.json({
              updatedMark: result,
            });
          }
        );
      }
    }
  );
};
