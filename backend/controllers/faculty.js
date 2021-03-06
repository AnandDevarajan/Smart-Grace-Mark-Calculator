const config = require('../config/db');
const con = config.con;
const { generateToken } = require('../utils/auth');
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EmailID,
    pass: process.env.Pass,
  },
});

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
          token: generateToken(result[0].FacultyID),
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
                token: generateToken(result[0].FacultyID),
              });
              transporter.sendMail(
                {
                  from: 'c8.smartgracemarkcalculator@gmail.com',
                  to: result[0].EmailID,
                  subject: 'Welcome to Smart Grace Mark Calculator',
                  text: `Dear Faculty,
                       YOU HAVE SUCCESSFULLY CREATED AN ACCOUNT!`,
                },
                function (error, info) {
                  if (error) {
                    console.log(error);
                  } else {
                    console.log('Email sent: ' + info.response);
                  }
                }
              );
            }
          );
        }
      }
    );
  });
};

exports.getAllFaculties = (req, res) => {
  con.query(`SELECT * FROM FACULTY`, (err, result) => {
    if (result.length === 0 || err) {
      return res.status(400).json({
        message: 'No Faculty found',
      });
    }
    return res.json({
      faculties: result,
    });
  });
};

exports.resetPassword = (req, res) => {
  crypto.randomBytes(32, (err, buffer) => {
    const { email } = req.body;
    if (err) {
      console.log(err);
    }
    const token = buffer.toString('hex');
    con.query(
      `SELECT * FROM FACULTY WHERE EmailID=?`,
      [email],
      (err, result) => {
        if (result.length === 0 || err) {
          return res.status(400).json({
            message: 'User not found',
          });
        }
        if (result.length > 0) {
          result[0].resettoken = token;
          result[0].expiresin = Date.now() + 3600000;
          con.query(
            'UPDATE FACULTY SET resettoken=?, expiresin=? WHERE EmailID=?',
            [result[0].resettoken, result[0].expiresin, email],
            (err, result) => {
              if (err) {
                console.log(err);
              }
              if (result) {
                con.query(
                  `SELECT * FROM FACULTY WHERE EmailID=?`,
                  [email],
                  (err, result) => {
                    if (err) {
                      return res.status(400).json({
                        message: 'No user found',
                      });
                    }
                    transporter.sendMail(
                      {
                        from: 'c8.smartgracemarkcalculator@gmail.com',
                        to: result[0].EmailID,
                        subject: 'Reset Password',
                        html: `
                        <p>You requested for password reset </p>
                        <h3>Click on this <a href="http://localhost:3000/faculty/reset/${token}">link</a> to reset password</h3>
                        `,
                      },
                      function (error, info) {
                        if (error) {
                          console.log(error);
                        } else {
                          console.log('Email sent: ' + info.response);
                          res.json({
                            message: 'Check your email',
                          });
                        }
                      }
                    );
                  }
                );
              }
            }
          );
        }
      }
    );
  });
};

exports.newPassword = (req, res) => {
  const { password, token } = req.body;
  console.log(token, password);
  con.query(
    `SELECT * FROM FACULTY WHERE resettoken=? AND expiresin>=?`,
    [token, Date.now()],
    (err, result) => {
      if (err || result.length === 0) {
        return res.status(422).json({
          message: 'Session Expired',
        });
      }
      bcrypt.hash(password, 10, (err, hash) => {
        if (err) {
          return console.log(err);
        }
        con.query(
          'UPDATE fACULTY SET Password=?,resettoken=?,expiresin=? WHERE resettoken=?',
          [hash, 'N/A', 'N/A', token],
          (err, result) => {
            if (err) {
              return res.status(400).json({
                message: 'Unable to reset password',
              });
            }
            if (result) {
              res.json({
                message: 'Password updated successfully',
              });
            }
          }
        );
      });
    }
  );
};
