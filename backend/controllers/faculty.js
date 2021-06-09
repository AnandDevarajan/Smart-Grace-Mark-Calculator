const config = require("../config/db");
const con = config.con;
const { generateToken } = require("../utils/auth");
const crypto = require("crypto");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
require("dotenv").config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EmailID,
    pass: process.env.Pass,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

exports.authFaculty = (req, res) => {
  const { email, password } = req.body;
  con.query(`SELECT * FROM faculty WHERE EmailID=?`, email, (err, result) => {
    if (result.length === 0 || err) {
      return res.status(400).json({
        message: "Invalid Email",
      });
    }
    if (result.length > 0) {
      bcrypt.compare(password, result[0].Password, (err, hash) => {
        if (!hash) {
          return res.status(400).json({
            message: "Invalid Password",
          });
        }
        if (err) {
          return res.status(400).json({
            message: "Invalid credentials",
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
  adviser === "No" ? (newBatch = "N/A") : batch;
  bcrypt.hash(password, 10, (err, hash) => {
    if (err) {
      console.log(err);
    }
    con.query(
      `INSERT INTO faculty (Name,EmailID,PhoneNum,Address,DOB,Gender,Department,CourseID,ClassAdviser,Batch,Password) VALUES (?,?,?,?,?,?,?,?,?,?,?)`,
      [
        name,
        email,
        phone,
        address,
        dob.substring(0, 10),
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
            message: "Unable to create user",
          });
        }
        if (result) {
          con.query(
            `SELECT * FROM faculty  WHERE EmailID='${email}'`,
            (err, result) => {
              if (err) {
                return res.status(400).json({
                  message: "No user found",
                });
              }
              res.json({
                result: result[0],
                token: generateToken(result[0].FacultyID),
              });
              transporter.sendMail(
                {
                  from: "c8.smartgracemarkcalculator@gmail.com",
                  to: result[0].EmailID,
                  subject: "Welcome to Smart Grace Mark Calculator",
                  text: `Dear Faculty,
                       YOU HAVE SUCCESSFULLY CREATED AN ACCOUNT!`,
                },
                function (error, info) {
                  if (error) {
                    console.log(error);
                  } else {
                    console.log("Email sent: " + info.response);
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
  con.query(`SELECT * FROM faculty`, (err, result) => {
    if (result.length === 0 || err) {
      return res.status(400).json({
        message: "No Faculty found",
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
    const token = buffer.toString("hex");
    con.query(
      `SELECT * FROM faculty WHERE EmailID=?`,
      [email],
      (err, result) => {
        if (result.length === 0 || err) {
          return res.status(400).json({
            message: "User not found",
          });
        }
        if (result.length > 0) {
          result[0].resettoken = token;
          result[0].expiresin = Date.now() + 3600000;
          con.query(
            "UPDATE faculty SET resettoken=?, expiresin=? WHERE EmailID=?",
            [result[0].resettoken, result[0].expiresin, email],
            (err, result) => {
              if (err) {
                console.log(err);
              }
              if (result) {
                con.query(
                  `SELECT * FROM faculty WHERE EmailID=?`,
                  [email],
                  (err, result) => {
                    if (err) {
                      return res.status(400).json({
                        message: "No user found",
                      });
                    }
                    transporter.sendMail(
                      {
                        from: "c8.smartgracemarkcalculator@gmail.com",
                        to: result[0].EmailID,
                        subject: "Reset Password",
                        html: `
                        <p>You requested for password reset </p>
                        <h3>Click on this <a href="http://localhost:3000/faculty/reset/${token}">link</a> to reset password</h3>
                        `,
                      },
                      function (error, info) {
                        if (error) {
                          console.log(error);
                        } else {
                          console.log("Email sent: " + info.response);
                          res.json({
                            message: "Check your email",
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
    `SELECT * FROM faculty WHERE resettoken=? AND expiresin>=?`,
    [token, Date.now()],
    (err, result) => {
      if (err || result.length === 0) {
        return res.status(422).json({
          message: "Session Expired",
        });
      }
      bcrypt.hash(password, 10, (err, hash) => {
        if (err) {
          return console.log(err);
        }
        con.query(
          "UPDATE faculty SET Password=?,resettoken=?,expiresin=? WHERE resettoken=?",
          [hash, "N/A", "N/A", token],
          (err, result) => {
            if (err) {
              return res.status(400).json({
                message: "Unable to reset password",
              });
            }
            if (result) {
              res.json({
                message: "Password updated successfully",
              });
            }
          }
        );
      });
    }
  );
};

exports.getFaculty = (req, res) => {
  const id = req.params.id;
  con.query(`SELECT * FROM faculty WHERE FacultyID=?`, [id], (err, result) => {
    if (result.length === 0 || err) {
      return res.status(400).json({
        message: "No faculty found",
      });
    }
    return res.json({
      faculty: result[0],
    });
  });
};

exports.updateFacultyProfile = (req, res) => {
  const id = req.params.id;
  con.query(`SELECT * FROM faculty WHERE FacultyID=?;`, [id], (err, result) => {
    if (err || result.length === 0) {
      return res.status(400).json({
        message: "No faculty Found",
      });
    }
    if (result) {
      result[0].PhoneNum = req.body.phone || result[0].PhoneNum;
      result[0].EmailID = req.body.email || result[0].EmailID;
      result[0].Address = req.body.address || result[0].Address;

      con.query(
        `UPDATE faculty SET PhoneNum=?,EmailID=?,Address=? WHERE FacultyID=?`,
        [result[0].PhoneNum, result[0].EmailID, result[0].Address, id],
        (err, result) => {
          if (err || result.length === 0) {
            return res.status(400).json({
              message: "Failed to update",
            });
          }
          return res.json({
            faculty: result,
          });
        }
      );
    }
  });
};

exports.changePassword = (req, res) => {
  const id = req.params.id;
  const { password } = req.body;
  con.query(`SELECT * FROM faculty WHERE FacultyID=?;`, [id], (err, result) => {
    if (err || result.length === 0) {
      return res.status(400).json({
        message: "No faculty found",
      });
    }

    bcrypt.hash(password, 10, (err, hash) => {
      if (err) {
        return console.log(err);
      }
      con.query(
        "UPDATE faculty SET Password=? WHERE FacultyID=?",
        [hash, id],
        (err, result) => {
          if (err) {
            return res.status(400).json({
              message: "Unable to reset password",
            });
          }
          if (result) {
            res.json({
              message: "Password updated successfully",
            });
          }
        }
      );
    });
  });
};

exports.facultyDeleteAccount = (req, res) => {
  const id = req.params.id;
  con.query(`DELETE FROM faculty WHERE FacultyID=?`, [id], (err, res) => {
    if (err) {
      console.log(err.sqlMessage);
    }
  });
};

exports.facultyStatus = (req, res) => {
  const id = req.params.id;

  con.query(`SELECT * from faculty where FacultyID=? `, [id], (err, result) => {
    if (err || result.length === 0) {
      return res.status(400).json({
        error: "No faculty found",
      });
    }
    if (result[0].ClassAdviser === "Yes") {
      con.query(
        "SELECT count(Grade) as count FROM grace_marks.course_mark WHERE CourseID=? AND Grade=?",
        [result[0].CourseID, "N/P"],
        (err, result) => {
          console.log(result[0].count);
          if (result[0].count === 0) {
            con.query(
              `SELECT count(c.final_status) as fcount from course_mark c  inner Join student s on s.RollNum=c.RollNum Where s.Requested="accepted" AND c.CourseID=? AND c.final_status=?`,
              [result[0].CourseID, "N/P"],
              (err, result) => {
                if (result[0].fcount === 0) {
                  con.query(
                    "UPDATE faculty set status=? where FacultyID=?",
                    ["P", id],
                    (err, result) => {
                      if (err) {
                        console.log(err.sqlMessage);
                      }
                      return res.json({
                        message: "Completion updated",
                      });
                    }
                  );
                }
              }
            );
          }
        }
      );
    } else if (result[0].ClassAdviser === "No") {
      con.query(
        "SELECT count(Grade) as count FROM grace_marks.course_mark WHERE CourseID=? AND Grade=?",
        [result[0].CourseID, "N/P"],
        (err, result) => {
          console.log(result[0].count);
          if (result[0].count === 0) {
            con.query(
              "UPDATE faculty set status=? where FacultyID=?",
              ["P", id],
              (err, result) => {
                if (err) {
                  console.log(err.sqlMessage);
                }
                return res.json({
                  message: "Completion updated",
                });
              }
            );
          }
        }
      );
    }
  });
};

exports.updateComplete = (req, res) => {
  const id = req.params.id;
  con.query(
    "UPDATE faculty SET completion=? WHERE FacultyID=?",
    ["Yes", id],
    (err, result) => {
      if (err) {
        return res.status(400).json({
          message: "Something went wrong",
        });
      }
      return res.json({
        message: "Updated successfully",
      });
    }
  );
};

exports.getAllFacultyStatus = (req, res) => {
  con.query(
    `SELECT count(FacultyID) as count FROM faculty where completion !=?;`,
    ["Yes"],
    (err, result) => {
      if (err) {
        return res.status(400).json({
          message: "Something went wrong",
        });
      }
      if (result[0].count === 0) {
        return res.json({
          calcStatus: "P",
        });
      } else {
        return res.json({
          calcStatus: "N/P",
        });
      }
    }
  );
};
