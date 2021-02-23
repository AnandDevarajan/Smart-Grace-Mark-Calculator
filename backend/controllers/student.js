const config = require('../config/db');
const con = config.con;
const { generateToken } = require('../utils/auth');
const bcrypt = require('bcrypt');

exports.authStudent = (req, res) => {
  const { email, password } = req.body;
  con.query(`SELECT * FROM STUDENT WHERE EmailID=?`, email, (err, result) => {
    if (err) {
      return res.status(400).json({
        message: 'Invalid credentials',
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
          id: result[0].RollNum,
          role: result[0].role,
          token: generateToken(result[0].RollNum),
        });
      });
    }
  });
};

exports.registerStudent = (req, res) => {
  const {
    name,
    rollno,
    email,
    phone,
    address,
    dob,
    gender,
    branch,
    degree,
    password,
  } = req.body;
  bcrypt.hash(password, 10, (err, hash) => {
    if (err) {
      console.log(err);
    }
    con.query(
      `INSERT INTO STUDENT (RollNum,Name,EmailID,PhoneNum,Address,DOB,Gender,Branch,Degree,Password) VALUES (?,?,?,?,?,?,?,?,?,?)`,
      [rollno, name, email, phone, address, dob, gender, branch, degree, hash],
      (err, result) => {
        if (err) {
          return res.status(400).json({
            message: 'Unable to create user',
          });
        }
        if (result) {
          con.query(
            `SELECT * FROM STUDENT WHERE RollNum='${rollno}'`,
            (err, result) => {
              if (err) {
                return res.status(400).json({
                  message: 'No user found',
                });
              }
              res.json({
                id: result[0].RollNum,
                token: generateToken(result[0].RollNum),
              });
            }
          );
        }
      }
    );
  });
};
