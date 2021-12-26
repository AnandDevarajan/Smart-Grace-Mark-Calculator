# Smart-Grace-Mark-Calculator

[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=AnandDevarajan_Smart-Grace-Mark-Calculator&metric=alert_status)](https://sonarcloud.io/dashboard?id=AnandDevarajan_Smart-Grace-Mark-Calculator) [![Bugs](https://sonarcloud.io/api/project_badges/measure?project=AnandDevarajan_Smart-Grace-Mark-Calculator&metric=bugs)](https://sonarcloud.io/dashboard?id=AnandDevarajan_Smart-Grace-Mark-Calculator) [![Security Rating](https://sonarcloud.io/api/project_badges/measure?project=AnandDevarajan_Smart-Grace-Mark-Calculator&metric=security_rating)](https://sonarcloud.io/dashboard?id=AnandDevarajan_Smart-Grace-Mark-Calculator) [![Maintainability Rating](https://sonarcloud.io/api/project_badges/measure?project=AnandDevarajan_Smart-Grace-Mark-Calculator&metric=sqale_rating)](https://sonarcloud.io/dashboard?id=AnandDevarajan_Smart-Grace-Mark-Calculator)[![Duplicated Lines (%)](https://sonarcloud.io/api/project_badges/measure?project=AnandDevarajan_Smart-Grace-Mark-Calculator&metric=duplicated_lines_density)](https://sonarcloud.io/dashboard?id=AnandDevarajan_Smart-Grace-Mark-Calculator) [![Lines of Code](https://sonarcloud.io/api/project_badges/measure?project=AnandDevarajan_Smart-Grace-Mark-Calculator&metric=ncloc)](https://sonarcloud.io/dashboard?id=AnandDevarajan_Smart-Grace-Mark-Calculator)


![Student Profile Page](https://drive.google.com/file/d/1SWGSDnqykk8_KKW6fIjf1OHwJlb03i17/view)
## Algorithm used to add grace mark and calculate new grade.
```
exports.calculateNewGrade = (req, res) => {
  const id = req.params.id;
  const { grace, gm } = req.body;
  if (gm === undefined) {
    return res.status(400).json({
      message: "No Grace Mark",
    });
  }
  for (let _range of grace) {
    if (_range.O === "") {
      return res.status(400).json({
        message: "Grade Ranges not set",
      });
    }
  }
  let maxCredits = 0;
  let GraceMarkUsed = 0;
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
        GraceMarkUsed = 1;
        info.Total = parseInt(info.Total) + parseInt(gm);
        let cid = info.CourseID;
        //Grade to P
        con.query(
          `UPDATE course_mark SET Total=?,Final_Grade=? WHERE CourseID=? AND RollNum=?;UPDATE course_mark SET final_status=? WHERE RollNum=?;UPDATE student SET final_status="N/P",cgpa_status=?,grace_status=? WHERE RollNum=?`,
          [info.Total, "P", cid, id, "P", id, "N/P", "P", id],
          (err, result) => {
            if (err) {
              return res.status(400).json({
                message: "Unable to Update",
              });
            }
            return res.json({
              message: "Total Marks Updated",
              Total: info.Total,
              Grade: "P",
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
      if (info.Grade == "A+") {
        if (parseInt(info.Total) + parseInt(gm) >= parseInt(info.O)) {
          passMaxCredits = Math.max(
            passMaxCredits,
            0.5 * parseInt(info.credits)
          );
        }
      } else if (info.Grade != "O" && info.Grade != "A+") {
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
        if (parseInt(info.Total) + parseInt(gm) >= parseInt(range[index])) {
          passMaxCredits = Math.max(
            passMaxCredits,
            gradeChange[index] * parseInt(info.credits)
          );

          console.log(
            "change index",
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
        GraceMarkUsed = 1;
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
          `UPDATE course_mark SET Total =? ,Final_Grade=? WHERE RollNum=? AND CourseID=?;UPDATE course_mark SET final_status=? WHERE RollNum=?;UPDATE student SET final_status="N/P", cgpa_status=?,grace_status=? WHERE RollNum=?`,
          [
            parseInt(info.Total) + parseInt(gm),
            FinalGrade,
            id,
            info.CourseID,
            "P",
            id,
            "N/P",
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
              Total: parseInt(info.Total) + parseInt(gm),
              Grade: FinalGrade,
            });
          }
        );
        break;
      }
    }
  }
  if (GraceMarkUsed == 0) {
    return res.json({
      message: "No Grade Change",
    });
  }
};
```
