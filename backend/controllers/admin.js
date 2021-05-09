const config = require("../config/db");
const con = config.con;
const { generateToken } = require("../utils/auth");
const crypto = require("crypto");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const { error } = require("console");
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

exports.authAdmin = (req, res) => {
  const { email, password } = req.body;
  con.query(
    `SELECT * FROM ADMINISTRATOR WHERE EmailID=?`,
    email,
    (err, result) => {
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
            token: generateToken(result[0].adminID),
          });
        });
      }
    }
  );
};

exports.registerAdmin = (req, res) => {
  const { name, email, phone, address, dob, gender, password } = req.body;
  bcrypt.hash(password, 10, (err, hash) => {
    if (err) {
      console.log(err);
    }

    con.query(
      `INSERT INTO ADMINISTRATOR (Name,EmailID,PhoneNum,Address,DOB,Gender,Password) VALUES (?,?,?,?,?,?,?)`,
      [name, email, phone, address, dob.substring(0, 10), gender, hash],
      (err, result) => {
        if (err) {
          return res.status(400).json({
            message: "Unable to create Admin",
          });
        }
        if (result) {
          con.query(
            `SELECT * FROM ADMINISTRATOR  WHERE EmailID='${email}'`,
            (err, result) => {
              if (result.length === 0 || err) {
                return res.status(400).json({
                  message: "No user found",
                });
              }
              res.json({
                result: result[0],
                token: generateToken(result[0].adminID),
              });
              transporter.sendMail(
                {
                  from: "c8.smartgracemarkcalculator@gmail.com",
                  to: result[0].EmailID,
                  subject: "Welcome to Smart Grace Mark Calculator",
                  text: `Dear User,
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

exports.resetPassword = (req, res) => {
  crypto.randomBytes(32, (err, buffer) => {
    const { email } = req.body;
    if (err) {
      console.log(err);
    }
    const token = buffer.toString("hex");
    con.query(
      `SELECT * FROM ADMINISTRATOR WHERE EmailID=?`,
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
            "UPDATE ADMINISTRATOR SET resettoken=?, expiresin=? WHERE EmailID=?",
            [result[0].resettoken, result[0].expiresin, email],
            (err, result) => {
              if (err) {
                console.log(err);
              }
              if (result) {
                con.query(
                  `SELECT * FROM ADMINISTRATOR WHERE EmailID=?`,
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
                        <h3>Click on this <a href="http://localhost:3000/admin/reset/${token}">link</a> to reset password</h3>
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
    `SELECT * FROM ADMINISTRATOR WHERE resettoken=? AND expiresin>=?`,
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
          "UPDATE ADMINISTRATOR SET Password=?,resettoken=?,expiresin=? WHERE resettoken=?",
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

exports.publishResults = (req, res) => {
  con.query(`SELECT * from Faculty WHERE completion!="Yes"`, (err, result) => {
    if (result.length === 0) {
      con.query(`SELECT EmailID from STUDENT`, (err, result) => {
        if (err || result.length === 0) {
          return res.status(422).json({
            message: "No Email Found",
          });
        }
        res.json({
          Emails: result,
        });
        con.query(`UPDATE COURSE_MARK SET status='P'`, (error, field) => {
          if (err || field.length == 0) {
            return res.status(400).json({
              message: "Failed to update",
            });
          }
        });
        let mailOptions = {
          from: "c8.smartgracemarkcalculator@gmail.com",
          to: JSON.stringify(result),
          subject: "Results published",
          html: ` 
            <h3>Dear student , The results for current semester has been published .
            Click on this <a href="http://localhost:3000/student/login/$">link</a> to view results</h3>`,
        };
        transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            console.log(error);
          } else {
            console.log(`Email sent:${info.response}`);
          }
        });
      });
    } else {
      return res.json({
        message:
          "Unable to Publish Results now. Mark allocation is yet to be completed",
      });
    }
  });
};

exports.getAdmin = (req, res) => {
  const id = req.params.id;
  con.query(
    `SELECT * FROM ADMINISTRATOR WHERE adminID=?`,
    [id],
    (err, result) => {
      if (result.length === 0 || err) {
        return res.status(400).json({
          message: "No admin found",
        });
      }
      return res.json({
        admin: result[0],
      });
    }
  );
};

exports.updateAdminProfile = (req, res) => {
  const id = req.params.id;
  con.query(
    `SELECT * FROM ADMINISTRATOR WHERE adminID=?;`,
    [id],
    (err, result) => {
      if (err || result.length === 0) {
        return res.status(400).json({
          message: "No admin Found",
        });
      }
      if (result) {
        result[0].PhoneNum = req.body.phone || result[0].PhoneNum;
        result[0].EmailID = req.body.email || result[0].EmailID;
        result[0].Address = req.body.address || result[0].Address;

        con.query(
          `UPDATE ADMINISTRATOR SET PhoneNum=?,EmailID=?,Address=? WHERE adminID=?`,
          [result[0].PhoneNum, result[0].EmailID, result[0].Address, id],
          (err, result) => {
            if (err || result.length === 0) {
              return res.status(400).json({
                message: "Failed to update",
              });
            }
            return res.json({
              admin: result,
            });
          }
        );
      }
    }
  );
};

exports.changePassword = (req, res) => {
  const id = req.params.id;
  const { password } = req.body;
  con.query(
    `SELECT * FROM ADMINISTRATOR WHERE adminID=?;`,
    [id],
    (err, result) => {
      if (err || result.length === 0) {
        return res.status(400).json({
          message: "No admin found",
        });
      }

      bcrypt.hash(password, 10, (err, hash) => {
        if (err) {
          return console.log(err);
        }
        con.query(
          "UPDATE ADMINISTRATOR SET Password=? WHERE adminID=?",
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
    }
  );
};

exports.adminDeleteAccount = (req, res) => {
  const id = req.params.id;
  con.query(`DELETE FROM ADMINISTRATOR WHERE adminID=?;`, [id], (err, res) => {
    if (err) {
      console.log(err.sqlMessage);
    }
  });
};

exports.getStatus = (req, res) => {
  con.query(`SELECT * from COURSE_MARK WHERE status='N/P'`, (error, result) => {
    if (result.length === 0) {
      return res.json({
        status: "Published",
      });
    }
    return res.json({
      status: "Not Published",
    });
  });
};

exports.resetPublish = (req, res) => {
  con.query(`UPDATE COURSE_MARK set STATUS = 'N/P'`, (error, result) => {
    if (error) {
      console.log(error);
    } else {
      con.query(
        `SELECT status from COURSE_MARK WHERE status='N/P'`,
        (error, result) => {
          if (result.length === 0) {
            return res.json({
              status: "Published",
            });
          }
          return res.json({
            status: "Not Published",
          });
        }
      );
    }
  });
};

exports.notifyFaculty = (req, res) => {
  const id = req.params.id;
  con.query(
    `SELECT EmailID from Faculty where FacultyID=?`,
    [id],
    (err, result) => {
      if (err || result.length === 0) {
        return res.status(422).json({
          message: "No Email Found",
        });
      }
      let mailOptions = {
        from: "c8.smartgracemarkcalculator@gmail.com",
        to: result[0].EmailID,
        subject: "Complete Grade Allocation",
        html: ` 
        <h3>Dear Faculty , Please complete your grade allocation as soon as possible</h3>`,
      };
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log(error);
        } else {
          console.log(`Email sent:${info.response}`);
        }
      });
    }
  );
};
