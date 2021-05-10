const config = require("../config/db");
const con = config.con;
const { generateToken } = require("../utils/auth");
const crypto = require("crypto");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const { stringify } = require("querystring");
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

exports.authStudent = (req, res) => {
  const { email, password } = req.body;
  con.query(`SELECT * FROM STUDENT WHERE EmailID=?`, email, (err, result) => {
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
      `INSERT INTO STUDENT (RollNum,Name,EmailID,PhoneNum,Address,DOB,Gender,Branch,Batch,Degree,Password) VALUES (?,?,?,?,?,?,?,?,?,?,?);INSERT INTO COURSE_MARK (RollNum,CourseID) VALUES(?,'15CSE201'),(?,'15CSE213'),(?,'15CSE302'),(?,'15CSE312'),(?,'15CSE313');UPDATE FACULTY SET completion ="No";`,
      [
        rollno,
        name,
        email,
        phone,
        address,
        dob.substring(0, 10),
        gender,
        branch,
        batch,
        degree,
        hash,
        rollno,
        rollno,
        rollno,
        rollno,
        rollno,
      ],
      (err, result) => {
        if (err) {
          return res.status(400).json({
            message: "Unable to create user",
          });
        }
        if (result) {
          con.query(
            `SELECT * FROM STUDENT WHERE RollNum='${rollno}'`,
            (err, result) => {
              if (err) {
                return res.status(400).json({
                  message: "No user found",
                });
              }
              res.json({
                result: result[0],
                token: generateToken(result[0].RollNum),
              });
              transporter.sendMail(
                {
                  from: "c8.smartgracemarkcalculator@gmail.com",
                  to: result[0].EmailID,
                  subject: "Welcome to Smart Grace Mark Calculator",
                  text: `Dear Student,
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
      `SELECT * FROM STUDENT WHERE EmailID=?`,
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
            "UPDATE STUDENT SET resettoken=?, expiresin=? WHERE EmailID=?",
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
                        <h3>Click on this <a href="http://localhost:3000/student/reset/${token}">link</a> to reset password</h3>
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
    `SELECT * FROM STUDENT WHERE resettoken=? AND expiresin>=?`,
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
          "UPDATE STUDENT SET Password=?,resettoken=?,expiresin=? WHERE resettoken=?",
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

exports.getAllStudents = (req, res) => {
  con.query(`SELECT * FROM STUDENT`, (err, result) => {
    if (result.length === 0 || err) {
      return res.status(400).json({
        message: "No students found",
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
        message: "No students found",
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
  console.log(request);
  if (request !== "select" || request.length > 0) {
    let Requested = "pending";
    con.query(
      "SELECT GraceMark from gracemark Where Description =?",
      [request],
      (err, result) => {
        if (err || result.length === 0) {
          return res.status(400).json({
            message: "Gracemark not found",
          });
        }
        con.query(
          `UPDATE STUDENT SET Requested=?, GraceDesc=?,GraceMark=? WHERE RollNum=?`,
          [Requested, request, result[0].GraceMark, id],
          (err, result) => {
            if (err || result.length === 0) {
              return res.json({
                message: "Unable to request grace mark",
              });
            }
            if (result) {
              con.query(
                `SELECT * FROM STUDENT WHERE RollNum='${id}'`,
                (err, result) => {
                  if (err) {
                    return res.status(400).json({
                      message: "No user found",
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
      }
    );
  } else {
    return res.json({
      message: "Unable to request for grace marks",
    });
  }
};

exports.acceptRequest = (req, res) => {
  let id = req.params.id;
  let Requested = "accepted";
  con.query(
    `UPDATE STUDENT SET Requested=? WHERE RollNum=?`,
    [Requested, id],
    (err, result) => {
      if (err || result.length === 0) {
        return res.json({
          message: "Unable to update request",
        });
      }
      if (result) {
        con.query(`SELECT * FROM STUDENT`, (err, result) => {
          if (err || result.length === 0) {
            return res.status(200).json({
              message: "No students found",
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
  let Requested = "rejected";
  con.query(
    `UPDATE STUDENT SET Requested=? WHERE RollNum=?`,
    [Requested, id],
    (err, result) => {
      if (err || result.length === 0) {
        return res.json({
          message: "Unable to update request",
        });
      }
      if (result) {
        con.query(`SELECT * FROM STUDENT`, (err, result) => {
          if (err || result.length === 0) {
            return res.status(400).json({
              message: "No students found",
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

exports.cancelRequest = (req, res) => {
  let id = req.params.id;
  let Requested = "N/A";
  let GraceDesc = "N/A";
  let GraceMark = "N/A";
  con.query(
    `UPDATE STUDENT SET Requested=?,GraceDesc=?,GraceMark=? WHERE RollNum=?`,
    [Requested, GraceDesc, GraceMark, id],
    (err, result) => {
      if (err || result.length === 0) {
        return res.json({
          message: "Unable to cancel request",
        });
      }
      return res.json({
        message: "Request canceled successfully",
      });
    }
  );
};

exports.batchStudents = (req, res) => {
  const id = req.params.id;
  con.query(`SELECT * FROM STUDENT WHERE Batch=?`, [id], (err, result) => {
    if (result.length === 0 || err) {
      return res.status(400).json({
        message: "No students found",
      });
    }
    return res.json({
      students: result,
    });
  });
};

exports.courseStudents = (req, res) => {
  const id = req.params.id;
  console.log(id);
  con.query(`SELECT * FROM STUDENT WHERE Branch=?`, [id], (err, result) => {
    if (result.length === 0 || err) {
      return res.status(400).json({
        message: "No students found",
      });
    }
    return res.json({
      students: result,
    });
  });
};

exports.courseStudentsMarks = (req, res) => {
  const id = req.params.id;
  console.log(id);
  con.query(
    `select  s.RollNum,s.Name,s.Branch,s.Batch,c.Internals,c.Marks,c.Total,c.Grade from student s inner  join course_mark c on s.RollNum = c.RollNum and c.CourseID LIKE ?`,
    [id],
    (err, result) => {
      if (result.length === 0 || err) {
        return res.status(400).json({
          message: "No students found",
        });
      }
      return res.json({
        students: result,
      });
    }
  );
};

exports.updateStudentProfile = (req, res) => {
  const id = req.params.id;
  con.query(`SELECT * FROM STUDENT WHERE RollNum=?;`, [id], (err, result) => {
    if (err || result.length === 0) {
      return res.status(400).json({
        message: "No studentFound",
      });
    }
    if (result) {
      result[0].PhoneNum = req.body.phone || result[0].PhoneNum;
      result[0].EmailID = req.body.email || result[0].EmailID;
      result[0].Address = req.body.address || result[0].Address;

      con.query(
        `UPDATE STUDENT SET PhoneNum=?,EmailID=?,Address=? WHERE RollNum=?`,
        [result[0].PhoneNum, result[0].EmailID, result[0].Address, id],
        (err, result) => {
          if (err || result.length === 0) {
            return res.status(400).json({
              message: "Failed to update",
            });
          }
          return res.json({
            student: result,
          });
        }
      );
    }
  });
};

exports.changePassword = (req, res) => {
  const id = req.params.id;
  const { password } = req.body;
  con.query(`SELECT * FROM STUDENT WHERE RollNum=?;`, [id], (err, result) => {
    if (err || result.length === 0) {
      return res.status(400).json({
        message: "No studentFound",
      });
    }

    bcrypt.hash(password, 10, (err, hash) => {
      if (err) {
        return console.log(err);
      }
      con.query(
        "UPDATE STUDENT SET Password=? WHERE RollNum=?",
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

exports.getStudentGrade = (req, res) => {
  const id = req.params.id;
  const token = id.substring(0, id.length - 17);
  const roll = id.substring(id.length - 16, id.length);
  console.log(token);
  console.log(roll);
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  if (roll === decoded.id) {
    con.query(
      `select  c.RollNum,c.CourseID,c.Internals,c.Marks,c.Total,s.CourseName ,c.Grade from course_mark c inner  join course s on s.CourseID = c.CourseID and c.RollNum LIKE ?`,
      [roll],
      (err, result) => {
        if (result.length === 0 || err) {
          return res.status(400).json({
            message: "No marks found",
          });
        }
        return res.json({
          markList: result,
        });
      }
    );
  }
};

exports.deleteAccount = (req, res) => {
  const id = req.params.id;
  con.query(
    `DELETE FROM STUDENT WHERE RollNum=?;DELETE FROM COURSE_MARK WHERE RollNum=?`,
    [id, id],
    (err, res) => {
      if (err) {
        console.log(err.sqlMessage);
      }
    }
  );
};

exports.getGraceInfo = (req, res) => {
  const id = req.params.id;
  con.query(
    `SELECT c.CourseID,c.Total,c.Grade,s.credits,g.O,g.Ap,g.A,g.Bp,g.B,g.C,g.P from grace_marks.course_mark c inner join grace_marks.course s on c.CourseID=s.CourseID inner join grace_marks.range g on c.CourseID=g.CourseID and c.RollNum =? order by c.Total`,
    [id],
    (err, result) => {
      if (result.length === 0 || err) {
        return res.status(400).json({
          message: "Something went wrong",
        });
      }
      return res.json({
        GraceInfo: result,
      });
    }
  );
};

exports.calculateNewGrade = (req, res) => {
  const id = req.params.id;
  console.log(id);
  const { grace, gm } = req.body;
  let maxCredits = 0;

  // If the person has failed in any subject one or more
  for (let info of grace) {
    if (
      parseInt(info.Total) < parseInt(info.P) &&
      parseInt(info.Total) + parseInt(gm) >= parseInt(info.P)
    ) {
      maxCredits = Math.max(maxCredits, info.credits);
    }
  }
  // The student has failed and if we add grace mark he will pass
  if (maxCredits != 0) {
    for (let info of grace) {
      if (info.Total < info.P && info.credits == maxCredits) {
        info.Total = parseInt(info.Total) + parseInt(gm);
        let cid = info.CourseID;
        //Grade to P
        con.query(
          `UPDATE COURSE_MARK SET Total=?,Final_Grade=? WHERE CourseID=? AND RollNum=?;UPDATE course_mark SET final_status=? WHERE RollNum=?`,
          [info.Total, "P", cid, id, "P", id],
          (err, result) => {
            if (err) {
              return res.status(400).json({
                message: "Unable to Update",
              });
            }
            return res.json({
              message: "Total Marks Updated",
            });
          }
        );
        break;
      }
    }
  }
  //If the student has not failed
  else {
    let passMaxCredits = 0;
    for (let info of grace) {
      let index = 0;
      let range = []; // minimum marks for each grade(in grade change)
      let gradeChange = []; // To handle A+ to O and A to A+
      if (info.Grade != "O") {
        range.push(parseInt(info.P));
        gradeChange.push(1);
        range.push(parseInt(info.C));
        gradeChange.push(1);
        range.push(parseInt(info.B));
        gradeChange.push(1);
        range.push(parseInt(info.Bp));
        gradeChange.push(1);
        range.push(parseInt(info.A));
        gradeChange.push(0.5);
        range.push(parseInt(info.Ap));
        gradeChange.push(0.5);
        range.push(parseInt(info.O));
        // Next grade that the student might get if we add grace marks (Index)
        while (range[index] < parseInt(info.Total)) {
          index++;
        }
        // Maximum Grade change for the available grace marks
        if (parseInt(info.Total) + parseInt(gm) >= range[index]) {
          passMaxCredits = Math.max(
            passMaxCredits,
            gradeChange[index] * parseInt(info.credits)
          );
        }
      }
    }
    
    let changeValue = 0;
    let FinalGrade = "";
    for (let info of grace) {
      if (info.Grade == "A" || info.Grade == "A+") {
        changeValue = 0.5;
      } else {
        changeValue = 1;
      }

      //assigning to maximum grade change
      if (
        info.Grade != "O" &&
        changeValue * parseInt(info.credits) == passMaxCredits
      ) {
        // Before change to After Grade change
        if (info.Grade == "P") {
          FinalGrade = "C";
        } else if (info.Grade == "C") {
          FinalGrade = "B";
        } else if (info.Grade == "B") {
          FinalGrade = "B+";
        } else if (info.Grade == "B+") {
          FinalGrade = "A";
        } else if (info.Grade == "A") {
          FinalGrade = "A+";
        } else {
          FinalGrade = "O";
        }
        //Update your Final Grade into data base both grade and marks reflected in database
        con.query(
          "UPDATE course_mark SET Total =? ,Final_Grade=? WHERE RollNum=? AND CourseID=?;UPDATE course_mark SET final_status=? WHERE RollNum=?",
          [
            parseInt(info.Total) + parseInt(gm),
            FinalGrade,
            id,
            info.CourseID,
            "P",
            id,
          ],
          (err, result) => {
            if (err) {
              return res.status(400).json({
                message: "Unable to update Grades",
              });
            }
            return res.json({
              message: "Grades updated",
            });
          }
        );
        break;
      }
    }
  }
};

exports.calculateCGPA = (req, res) => {
  const id = req.params.id;
  const { marks } = req.body;
  let cgpa = 0;
  let final_cgpa = 0;
  let denominator = 0;
  let numerator = 0;
  let numerator1 = 0;
  let gradePoints = {
    O: 10,
    "A+": 9.5,
    A: 9,
    "B+": 8,
    B: 7,
    C: 6,
    P: 5,
    F: 4,
  };
  for (let student of marks) {
    numerator += gradePoints[student.Final_Grade] * parseInt(student.credits);
    numerator1 += gradePoints[student.Grade] * parseInt(student.credits);
    denominator += parseInt(student.credits);
  }

  final_cgpa = (numerator / denominator).toFixed(2);
  cgpa = (numerator1 / denominator).toFixed(2);

  console.log(final_cgpa);
  console.log(cgpa);

  if (cgpa <= 10 && cgpa > 0) {
    con.query(
      "UPDATE student SET cgpa =? ,final_cgpa=?,cgpa_status=?,final_status=? WHERE RollNum=?",
      [cgpa, final_cgpa, "P", "P", id]
    );
  } else {
    return res.status(400).json({
      message: "Unable to calculate cgpa now",
    });
  }
};

exports.getCgpaCount = (req, res) => {
  con.query(
    `SELECT count(RollNum) as count FROM STUDENT Where cgpa= ?`,
    ["N/P"],
    (err, result) => {
      if (err) {
        return res.status(400).json({
          message: "Something went wrong",
        });
      }
      if (result[0].count === 0) {
        return res.json({
          cgpaStatus: "P",
        });
      }
      return res.json({
        cgpaStatus: "N/P",
      });
    }
  );
};

exports.getGraceStatus = (req, res) => {
  con.query(
    'SELECT count(c.RollNum) as count From course_Mark c  Inner Join student s on c.RollNum=s.RollNum Where s.Requested="accepted" and c.final_status="N/P"',
    (err, result) => {
      if (err) {
        return res.status(400).json({
          message: "No Students found",
        });
      }
      if (result[0].count === 0) {
        return res.json({
          graceStatus: "P",
        });
      }
      return res.json({
        graceStatus: "N/P",
      });
    }
  );
};
