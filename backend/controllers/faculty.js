const config = require('../config/db');
const con = config.con;
const { generateToken } = require('../utils/auth');
const bcrypt = require('bcrypt');

exports.authFaculty = (req, res) => {
  const { email, password } = req.body;
  con.query(`SELECT * FROM FACULTY WHERE EmailID=?`, email, (err, result) => {
    if (result.length === 0 || err) {
      return res.status(400).json({
        message: 'Invalid Email',
      });
    }
    if (result.length > 0) {
      bcrypt.compare(password, result[0].Password, (err, hash) => {
        if (!hash) {
          return res.status(400).json({
            message: 'Invalid Password',
          });
        }
        if (err) {
          return res.status(400).json({
            message: 'Invalid credentials',
          });
        }
        return res.json({
          result: result[0],
          token: generateToken(result[0].facultyID),
        });
      });
    }
  });
};

exports.registerFaculty = (req, res) => {
  const {
    name,
    email,
    phone,
    address,
    dob,
    gender,
    courseId,
    department,
    adviser,
    batch,
    password,
  } = req.body;

  const courseCode = courseId.substring(0, 8);
  let newBatch = batch;
  adviser === 'No' ? (newBatch = 'N/A') : batch;
  bcrypt.hash(password, 10, (err, hash) => {
    if (err) {
      console.log(err);
    }
    con.query(
      `INSERT INTO FACULTY (Name,EmailID,PhoneNum,Address,DOB,Gender,Department,CourseID,ClassAdviser,Batch,Password) VALUES (?,?,?,?,?,?,?,?,?,?,?)`,
      [
        name,
        email,
        phone,
        address,
        dob,
        gender,
        department,
        courseCode,
        adviser,
        newBatch,
        hash,
      ],
      (err, result) => {
        if (err) {
          return res.status(400).json({
            message: 'Unable to create user',
          });
        }
        if (result) {
          con.query(
            `SELECT * FROM FACULTY  WHERE EmailID='${email}'`,
            (err, result) => {
              if (err) {
                return res.status(400).json({
                  message: 'No user found',
                });
              }
              res.json({
                result: result[0],
                token: generateToken(result[0].facultyID),
              });
            }
          );
        }
      }
    );
  });
};
