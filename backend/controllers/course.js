const config = require("../config/db");
const con = config.con;

exports.getAllCourses = (req, res) => {
  con.query(`SELECT * FROM COURSE`, (err, result) => {
    if (result.length === 0 || err) {
      return res.status(400).json({
        message: "No Courses found",
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
          message: "No Courses found",
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
          message: "Unable to Update Marks",
        });
      }
      return res.json({
        message: "Successfully Updated",
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
          message: "No Courses found",
        });
      }
      return res.json({
        markList: result,
      });
    }
  );
};

exports.getCourseMarkOfStudent = (req, res) => {
  const id = req.params.id;
  con.query(
    `select  c.RollNum,c.CourseID,c.Internals,c.Marks,c.final_status,c.Total,s.CourseName,s.credits,c.Grade,c.Final_Grade,s1.Requested from grace_marks.course_mark c inner join grace_marks.student s1 on c.RollNum LIKE ?  inner  join grace_marks.course s on s.CourseID = c.CourseID and c.RollNum LIKE ? group by c.CourseID`,
    [id, id],
    (err, result) => {
      if (err) {
        return res.status(400).json({
          message: "No marks found",
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
  let courseID = id.substring(n - 8, n);
  console.log(rollno);
  console.log(courseID);
  con.query(
    `SELECT * FROM COURSE_MARK WHERE CourseID=? and RollNum=?`,
    [courseID, rollno],
    (err, result) => {
      if (result.length === 0 || err) {
        return res.status(400).json({
          message: "No Marks found",
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
  con.query(
    `SELECT * FROM COURSE_MARK WHERE CourseID=? and RollNum=?`,
    [cid, id],
    (err, result) => {
      if (err || result.length === 0) {
        return res.status(400).json({
          message: "No course marks Found",
        });
      }
      if (result) {
        result[0].Internals = internals || result[0].Internals;
        result[0].Marks = marks || result[0].Marks;
        result[0].Total =
          parseInt(result[0].Internals) + parseInt(result[0].Marks);
        con.query(
          `UPDATE COURSE_MARK SET Internals=?,Marks=?,Total=?,Grade='N/P',status='N/P' WHERE CourseID=? AND RollNum=?;UPDATE GRADE_RANGE SET status ='N/P' WHERE CourseID=?`,
          [result[0].Internals, result[0].Marks, result[0].Total, cid, id, cid],
          (err, result) => {
            if (err || result.length === 0) {
              return res.status(400).json({
                message: "Failed to update",
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

exports.getCourseReport = (req, res) => {
  con.query(
    `SELECT c.CourseID,s.CourseName,avg(c.total) as Average,max(c.total) as Max,min(c.total) as Min ,count(c.CourseID) as Num ,g.status,s.credits FROM grace_marks.course_mark c  inner join grace_marks.course s on c.CourseID=s.CourseID inner join grace_marks.grade_range g on c.CourseID=g.CourseID group by c.CourseID order by c.CourseID`,
    (err, result) => {
      if (result.length === 0 || err) {
        return res.status(400).json({
          message: "No report found",
        });
      }
      return res.json({
        report: result,
      });
    }
  );
};

exports.getACourseReport = (req, res) => {
  const id = req.params.id;
  con.query(
    `SELECT c.CourseID,avg(c.total) as Average,max(c.total) as Max,min(c.total) as Min FROM grace_marks.course_mark c  inner join grace_marks.course s on c.CourseID=? group by c.CourseID`,
    [id],
    (err, result) => {
      if (result.length === 0 || err) {
        return res.status(400).json({
          message: "No report found",
        });
      }
      return res.json({
        report: result,
      });
    }
  );
};

exports.getAllGradeRange = (req, res) => {
  con.query(`SELECT * FROM GRADE_RANGE`, (err, result) => {
    if (result.length === 0 || err) {
      return res.status(400).json({
        message: "No report found",
      });
    }
    return res.json({
      allgrade: result,
    });
  });
};

exports.getGradeRange = (req, res) => {
  const id = req.params.id;
  con.query(
    `SELECT * FROM GRADE_RANGE WHERE CourseID=?`,
    [id],
    (err, result) => {
      if (result.length === 0 || err) {
        return res.status(400).json({
          message: "No report found",
        });
      }
      return res.json({
        grade: result,
      });
    }
  );
};

exports.updateGradeRange = (req, res) => {
  const id = req.params.id;
  const { max } = req.body;
  if (max >= 80) {
    let O = `${max}-${max - 5}`;
    let Ap = `${max - 6}-${max - 10}`;
    let A = `${max - 11}-${max - 15}`;
    let Bp = `${max - 16}-${max - 20}`;
    let B = `${max - 21}-${max - 30}`;
    let C = `${max - 31}-${max - 40}`;
    let P = `${max - 41}-${max - 65}`;
    let F = `${max - 66}-0`;
    let newO = O.substring(O.length - 2, O.length);
    let newAp = Ap.substring(Ap.length - 2, Ap.length);
    let newA = A.substring(A.length - 2, A.length);
    let newBp = Bp.substring(Bp.length - 2, Bp.length);
    let newB = B.substring(B.length - 2, B.length);
    let newC = C.substring(C.length - 2, C.length);
    let newP = P.substring(P.length - 2, P.length);
    let newF = F.substring(F.length - 2, F.length);
    con.query(
      `UPDATE GRADE_RANGE SET O=?,Ap=?,A=?,Bp=?,B=?,C=?,P=?,F=?,status=? WHERE CourseID=?`,
      [O, Ap, A, Bp, B, C, P, F, "P", id],
      (err, result) => {
        if (err) {
          return res.status(400).json({
            message: "Failed to update",
          });
        }
        con.query(
          `UPDATE GRACE_MARKS.RANGE SET O=?,Ap=?,A=?,Bp=?,B=?,C=?,P=?,F=? WHERE CourseID=?`,
          [newO, newAp, newA, newBp, newB, newC, newP, newF, id],
          (err, result2) => {
            if (err) {
              console.log(err.sqlMessage);
            }
            con.query(
              `SELECT * FROM GRADE_RANGE WHERE CourseID=?`,
              [id],
              (err, result2) => {
                if (result2.length === 0 || err) {
                  return res.status(400).json({
                    message: "No grade found",
                  });
                }
                return res.json({
                  grade: result2,
                });
              }
            );
          }
        );
      }
    );
  } else if (max >= 60 && max < 80) {
    let O = `${max}-${max - 4}`;
    let Ap = `${max - 5}-${max - 10}`;
    let A = `${max - 11}-${max - 14}`;
    let Bp = `${max - 15}-${max - 20}`;
    let B = `${max - 21}-${max - 25}`;
    let C = `${max - 26}-${max - 30}`;
    let P = `${max - 31}-${max - 49}`;
    let F = `${max - 50}-0`;
    let newO = O.substring(O.length - 2, O.length);
    let newAp = Ap.substring(Ap.length - 2, Ap.length);
    let newA = A.substring(A.length - 2, A.length);
    let newBp = Bp.substring(Bp.length - 2, Bp.length);
    let newB = B.substring(B.length - 2, B.length);
    let newC = C.substring(C.length - 2, C.length);
    let newP = P.substring(P.length - 2, P.length);
    let newF = F.substring(F.length - 2, F.length);

    con.query(
      `UPDATE GRADE_RANGE SET O=?,Ap=?,A=?,Bp=?,B=?,C=?,P=?,F=?,status=? WHERE CourseID=?`,
      [O, Ap, A, Bp, B, C, P, F, "P", id],
      (err, result) => {
        if (err) {
          return res.status(400).json({
            message: "Failed to update",
          });
        }
        con.query(
          `UPDATE GRACE_MARKS.RANGE SET O=?,Ap=?,A=?,Bp=?,B=?,C=?,P=?,F=? WHERE CourseID=?`,
          [newO, newAp, newA, newBp, newB, newC, newP, newF, id],
          (err, result2) => {
            if (err) {
              console.log(err.sqlMessage);
            }
            con.query(
              `SELECT * FROM GRADE_RANGE WHERE CourseID=?`,
              [id],
              (err, result2) => {
                if (result2.length === 0 || err) {
                  return res.status(400).json({
                    message: "No grade found",
                  });
                }
                return res.json({
                  grade: result2,
                });
              }
            );
          }
        );
      }
    );
  } else if (max >= 50 && max < 60) {
    let O = `${max}-${max - 3}`;
    let Ap = `${max - 4}-${max - 8}`;
    let A = `${max - 9}-${max - 12}`;
    let Bp = `${max - 13}-${max - 18}`;
    let B = `${max - 19}-${max - 23}`;
    let C = `${max - 24}-${max - 39}`;
    let P = `${max - 40}-${max - 47}`;
    let F = `${max - 48}-0`;
    let newO = O.substring(O.length - 2, O.length);
    let newAp = Ap.substring(Ap.length - 2, Ap.length);
    let newA = A.substring(A.length - 2, A.length);
    let newBp = Bp.substring(Bp.length - 2, Bp.length);
    let newB = B.substring(B.length - 2, B.length);
    let newC = C.substring(C.length - 2, C.length);
    let newP = P.substring(P.length - 2, P.length);
    let newF = F.substring(F.length - 2, F.length);

    con.query(
      `UPDATE GRADE_RANGE SET O=?,Ap=?,A=?,Bp=?,B=?,C=?,P=?,F=?,status=? WHERE CourseID=?`,
      [O, Ap, A, Bp, B, C, P, F, "P", id],
      (err, result) => {
        if (err) {
          return res.status(400).json({
            message: "Failed to update",
          });
        }
        con.query(
          `UPDATE GRACE_MARKS.RANGE SET O=?,Ap=?,A=?,Bp=?,B=?,C=?,P=?,F=? WHERE CourseID=?`,
          [newO, newAp, newA, newBp, newB, newC, newP, newF, id],
          (err, result2) => {
            if (err) {
              console.log(err.sqlMessage);
            }
            con.query(
              `SELECT * FROM GRADE_RANGE WHERE CourseID=?`,
              [id],
              (err, result2) => {
                if (result2.length === 0 || err) {
                  return res.status(400).json({
                    message: "No grade found",
                  });
                }
                return res.json({
                  grade: result2,
                });
              }
            );
          }
        );
      }
    );
  } else {
    let O = `${max}-${max - 3}`;
    let Ap = `${max - 4}-${max - 7}`;
    let A = `${max - 7}-${max - 12}`;
    let Bp = `${max - 13}-${max - 16}`;
    let B = `${max - 17}-${max - 22}`;
    let C = `${max - 23}-${max - 29}`;
    let P = `${max - 30}-${max - 39}`;
    let F = `${max - 40}-0`;
    let newO = O.substring(O.length - 2, O.length);
    let newAp = Ap.substring(Ap.length - 2, Ap.length);
    let newA = A.substring(A.length - 2, A.length);
    let newBp = Bp.substring(Bp.length - 2, Bp.length);
    let newB = B.substring(B.length - 2, B.length);
    let newC = C.substring(C.length - 2, C.length);
    let newP = P.substring(P.length - 2, P.length);
    let newF = F.substring(F.length - 2, F.length);

    con.query(
      `UPDATE GRADE_RANGE SET O=?,Ap=?,A=?,Bp=?,B=?,C=?,P=?,F=?,status=? WHERE CourseID=?`,
      [O, Ap, A, Bp, B, C, P, F, "P", id],
      (err, result) => {
        if (err) {
          return res.status(400).json({
            message: "Failed to update",
          });
        }
        con.query(
          `UPDATE GRACE_MARKS.RANGE SET O=?,Ap=?,A=?,Bp=?,B=?,C=?,P=?,F=? WHERE CourseID=?`,
          [newO, newAp, newA, newBp, newB, newC, newP, newF, id],
          (err, result2) => {
            if (err) {
              console.log(err.sqlMessage);
            }
            con.query(
              `SELECT * FROM GRADE_RANGE WHERE CourseID=?`,
              [id],
              (err, result2) => {
                if (result2.length === 0 || err) {
                  return res.status(400).json({
                    message: "No grade found",
                  });
                }
                return res.json({
                  grade: result2,
                });
              }
            );
          }
        );
      }
    );
  }
};

exports.getRangeDetails = (req, res) => {
  const id = req.params.id;
  con.query(
    `SELECT * FROM GRACE_MARKS.RANGE WHERE CourseID=?`,
    [id],
    (err, result) => {
      if (err) {
        return res.status(400).json({
          message: "No report found",
        });
      }
      return res.json({
        range: result,
      });
    }
  );
};

exports.updateGrade = (req, res) => {
  const cid = req.params.id;
  const { id, O, Ap, A, Bp, B, C, P, F, total } = req.body;
  if (parseInt(total) >= parseInt(O)) {
    let grade = "O";
    console.log("Grade =", grade);
    con.query(
      `UPDATE COURSE_MARK SET Grade=?,Final_Grade=?,status=? WHERE CourseID=? AND RollNum=?`,
      [grade, grade, "P", cid, id],
      (err, result) => {
        if (err || result.length === 0) {
          return res.status(400).json({
            message: "Failed to update",
          });
        }
        return res.json({
          message: "Updated Successfully",
        });
      }
    );
  } else if (parseInt(total) < parseInt(O) && parseInt(total) >= parseInt(Ap)) {
    let grade = "A+";
    console.log("Grade =", grade);
    con.query(
      `UPDATE COURSE_MARK SET Grade=?,Final_Grade=?,status=? WHERE CourseID=? AND RollNum=?`,
      [grade, grade, "P", cid, id],
      (err, result) => {
        if (err || result.length === 0) {
          return res.status(400).json({
            message: "Failed to update",
          });
        }
        return res.json({
          message: "Updated Successfully",
        });
      }
    );
  } else if (parseInt(total) < parseInt(Ap) && parseInt(total) >= parseInt(A)) {
    let grade = "A";
    console.log("Grade =", grade);

    con.query(
      `UPDATE COURSE_MARK SET Grade=?,Final_Grade=?,status=? WHERE CourseID=? AND RollNum=?`,
      [grade, grade, "P", cid, id],
      (err, result) => {
        if (err || result.length === 0) {
          return res.status(400).json({
            message: "Failed to update",
          });
        }
        return res.json({
          message: "Updated Successfully",
        });
      }
    );
  } else if (parseInt(total) < parseInt(A) && parseInt(total) >= parseInt(Bp)) {
    let grade = "B+";
    console.log("Grade =", grade);

    con.query(
      `UPDATE COURSE_MARK SET Grade=?,Final_Grade=?,status=? WHERE CourseID=? AND RollNum=?`,
      [grade, grade, "P", cid, id],
      (err, result) => {
        if (err || result.length === 0) {
          return res.status(400).json({
            message: "Failed to update",
          });
        }
        return res.json({
          message: "Updated Successfully",
        });
      }
    );
  } else if (parseInt(total) < parseInt(Bp) && parseInt(total) >= parseInt(B)) {
    let grade = "B";
    console.log("Grade =", grade);
    con.query(
      `UPDATE COURSE_MARK SET Grade=?,Final_Grade=?,status=? WHERE CourseID=? AND RollNum=?`,
      [grade, grade, "P", cid, id],
      (err, result) => {
        if (err || result.length === 0) {
          return res.status(400).json({
            message: "Failed to update",
          });
        }
        return res.json({
          message: "Updated Successfully",
        });
      }
    );
  } else if (parseInt(total) < parseInt(B) && parseInt(total) >= parseInt(C)) {
    let grade = "C";
    console.log("Grade =", grade);
    con.query(
      `UPDATE COURSE_MARK SET Grade=?,Final_Grade=?,status=? WHERE CourseID=? AND RollNum=?`,
      [grade, grade, "P", cid, id],
      (err, result) => {
        if (err || result.length === 0) {
          return res.status(400).json({
            message: "Failed to update",
          });
        }
        return res.json({
          message: "Updated Successfully",
        });
      }
    );
  } else if (parseInt(total) < parseInt(C) && parseInt(total) >= parseInt(P)) {
    let grade = "P";
    console.log("Grade =", grade);

    con.query(
      `UPDATE COURSE_MARK SET Grade=?,Final_Grade=?,status=? WHERE CourseID=? AND RollNum=?`,
      [grade, grade, "P", cid, id],
      (err, result) => {
        if (err || result.length === 0) {
          return res.status(400).json({
            message: "Failed to update",
          });
        }
        return res.json({
          message: "Updated Successfully",
        });
      }
    );
  } else if (parseInt(total) < parseInt(P)) {
    let grade = "F";
    console.log("Grade =", grade);

    con.query(
      `UPDATE COURSE_MARK SET Grade=?,Final_Grade=?,status=? WHERE CourseID=? AND RollNum=?`,
      [grade, grade, "P", cid, id],
      (err, result) => {
        if (err || result.length === 0) {
          return res.status(400).json({
            message: "Failed to update",
          });
        }
        return res.json({
          message: "Updated Successfully",
        });
      }
    );
  }
};

exports.editGradeRange = (req, res) => {
  const cid = req.params.id;
  console.log(cid);

  const { O, Ap, A, Bp, B, C, P, F } = req.body;
  console.log(O, Ap, A, Bp, B, C, P, F);
  let newO = O.substring(O.length - 2, O.length);
  let newAp = Ap.substring(Ap.length - 2, Ap.length);
  let newA = A.substring(A.length - 2, A.length);
  let newBp = Bp.substring(Bp.length - 2, Bp.length);
  let newB = B.substring(B.length - 2, B.length);
  let newC = C.substring(C.length - 2, C.length);
  let newP = P.substring(P.length - 2, P.length);
  let newF = F.substring(F.length - 2, F.length);
  con.query(
    `SELECT * FROM GRADE_RANGE WHERE CourseID=?`,
    [cid],
    (err, result) => {
      if (err || result.length === 0) {
        return res.status(400).json({
          message: "No course Found",
        });
      }
      if (result) {
        result[0].O = O || result[0].O;
        result[0].Ap = Ap || result[0].Ap;
        result[0].A = A || result[0].A;
        result[0].Bp = Bp || result[0].Bp;
        result[0].B = B || result[0].B;
        result[0].C = C || result[0].C;
        result[0].P = P || result[0].P;
        result[0].F = F || result[0].F;
        con.query(
          `UPDATE GRADE_RANGE SET O=?,Ap=?,A=?,Bp=?,B=?,C=?,P=?,F=? WHERE CourseID=?;UPDATE Grace_marks.RANGE SET O=?,Ap=?,A=?,Bp=?,B=?,C=?,P=?,F=? WHERE CourseID=?`,
          [
            result[0].O,
            result[0].Ap,
            result[0].A,
            result[0].Bp,
            result[0].B,
            result[0].C,
            result[0].P,
            result[0].F,
            cid,
            newO,
            newAp,
            newA,
            newBp,
            newB,
            newC,
            newP,
            newF,
            cid,
          ],
          (err, result) => {
            if (err || result.length === 0) {
              return res.status(400).json({
                message: "Failed to update",
              });
            }
            return res.json({
              EditedGradeRange: result,
            });
          }
        );
      }
    }
  );
};
