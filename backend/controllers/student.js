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
              transporter.sendMail(
                {
                  from: 'c8.smartgracemarkcalculator@gmail.com',
                  to: result[0].EmailID,
                  subject: 'Welcome to Smart Grace Mark Calculator',
                  text: `Dear Student,
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

exports.resetPassword = (req, res) => {
  crypto.randomBytes(32, (err, buffer) => {
    const { email } = req.body;
    if (err) {
      console.log(err);
    }
    const token = buffer.toString('hex');
    con.query(
      `SELECT * FROM STUDENT WHERE EmailID=?`,
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
            'UPDATE STUDENT SET resettoken=?, expiresin=? WHERE EmailID=?',
            [result[0].resettoken, result[0].expiresin, email],
            (err, result) => {
              if (err) {
                console.log(err);
              }
              if (result) {
                con.query(
                  `SELECT * FROM STUDENT WHERE EmailID=?`,
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
                        <h5>Click on this <a href="http://localhost:3000/student/reset/${token}">link</a> to reset password</h5>
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
    `SELECT * FROM STUDENT WHERE resettoken=? AND expiresin>=?`,
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
          'UPDATE STUDENT SET Password=? WHERE resettoken=?',
          [hash, token],
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

exports.getStudent = (req, res) => {
  const id = req.params.id;
  con.query(`SELECT * FROM STUDENT WHERE RollNum=?`, [id], (err, result) => {
    if (result.length === 0 || err) {
      return res.status(400).json({
        message: 'No students found',
      });
    }
    return res.json({
      student: result[0],
    });
  });
};

exports.addRequest = (req, res) => {
  let id = req.params.id;
  const { request } = req.body;
  let length = request.length;
  let desc = request.substring(0, length - 3);
  let mark = request.substring(length - 2, length);
  console.log(request);
  if (request !== 'select' || request.length > 0) {
    let Requested = 'pending';
    con.query(
      `UPDATE STUDENT SET Requested=?, GraceDesc=?,GraceMark=? WHERE RollNum=?`,
      [Requested, desc, mark, id],
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
        con.query(`SELECT * FROM STUDENT'`, (err, result) => {
          if (err || result.length === 0) {
            return res.status(400).json({
              message: 'No students found',
            });
          }
          return res.json({
            students: result,
          });
        });
      }
    }
  );
};

exports.rejectRequest = (req, res) => {
  let id = req.params.id;
  let Requested = 'rejected';
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
        con.query(`SELECT * FROM STUDENT'`, (err, result) => {
          if (err || result.length === 0) {
            return res.status(400).json({
              message: 'No students found',
            });
          }
          return res.json({
            students: result,
          });
        });
      }
    }
  );
};

exports.batchStudents = (req, res) => {
  const id = req.params.id;
  con.query(`SELECT * FROM STUDENT WHERE Batch=?`, [id], (err, result) => {
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
