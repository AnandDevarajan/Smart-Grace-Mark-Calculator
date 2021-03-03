const config = require('../config/db');
const con = config.con;
const { generateToken } = require('../utils/auth');
const bcrypt = require('bcrypt');

exports.authStudent = (req, res) => {
  const { email, password } = req.body;
  con.query(`SELECT * FROM STUDENT WHERE EmailID=?`, email, (err, result) => {
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
    batch,
    degree,
    password,
  } = req.body;
  bcrypt.hash(password, 10, (err, hash) => {
    if (err) {
      console.log(err);
    }
    con.query(
      `INSERT INTO STUDENT (RollNum,Name,EmailID,PhoneNum,Address,DOB,Gender,Branch,Batch,Degree,Password) VALUES (?,?,?,?,?,?,?,?,?,?,?)`,
      [
        rollno,
        name,
        email,
        phone,
        address,
        dob,
        gender,
        branch,
        batch,
        degree,
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
            `SELECT * FROM STUDENT WHERE RollNum='${rollno}'`,
            (err, result) => {
              if (err) {
                return res.status(400).json({
                  message: 'No user found',
                });
              }
              res.json({
                result: result[0],
                token: generateToken(result[0].RollNum),
              });
            }
          );
        }
      }
    );
  });
};

exports.getAllStudents = (req, res) => {
  con.query(`SELECT * FROM STUDENT`, (err, result) => {
    if (result.length === 0 || err) {
      return res.status(400).json({
        message: 'No students found',
      });
    }
    return res.json({
      students: result,
    });
  });
};

exports.addRequest = (req, res) => {
  let id = req.params.id;
  const { request } = req.body;
  console.log(request);
  if (request !== 'select' || request.length > 0) {
    let Requested = 'pending';
    con.query(
      `UPDATE STUDENT SET Requested=?, GraceDesc=? WHERE RollNum=?`,
      [Requested, request, id],
      (err, result) => {
        if (err || result.length === 0) {
          return res.json({
            message: 'Unable to request grace mark',
          });
        }
        if (result) {
          con.query(
            `SELECT * FROM STUDENT WHERE RollNum='${id}'`,
            (err, result) => {
              if (err) {
                return res.status(400).json({
                  message: 'No user found',
                });
              }
              return res.json({
                result: result[0],
                token: generateToken(result[0].RollNum),
              });
            }
          );
        }
      }
    );
  } else {
    return res.json({
      message: 'Unable to request for grace marks',
    });
  }
};

exports.acceptRequest = (req, res) => {
  let id = req.params.id;
  let Requested = 'accepted';
  con.query(
    `UPDATE STUDENT SET Requested=? WHERE RollNum=?`,
    [Requested, id],
    (err, result) => {
      if (err || result.length === 0) {
        return res.json({
          message: 'Unable to update request',
        });
      }
      if (result) {
        con.query(`SELECT * FROM STUDENT'`, (err, result1) => {
          if (err || result1.length === 0) {
            return res.status(400).json({
              message: 'No students found',
            });
          }
          return res.json({
            students: result1,
          });
        });
      }
    }
  );
};
