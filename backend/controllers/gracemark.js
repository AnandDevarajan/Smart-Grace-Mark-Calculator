const config = require("../config/db");
const con = config.con;

exports.createGraceMark = (req, res) => {
  const { description, mark } = req.body;

  con.query(
    `INSERT INTO gracemark (Description,GraceMark) VALUES (?,?)`,
    [description, mark],
    (err, result) => {
      if (err) {
        return res.status(400).json({
          message: "Unable to create Grace Mark details",
        });
      }
      if (result) {
        con.query(
          `SELECT * FROM gracemark WHERE Description='${description}'`,
          (err, result) => {
            if (err) {
              return res.status(400).json({
                message: "No Grace Mark Details found",
              });
            }
            res.json({
              result: result[0],
            });
          }
        );
      }
    }
  );
};

exports.getAllGraceMarks = (req, res) => {
  con.query(`SELECT * FROM gracemark`, (err, result) => {
    if (result.length === 0 || err) {
      return res.status(400).json({
        message: "No Gracemarks found",
      });
    }
    return res.json({
      gracemarks: result,
    });
  });
};

exports.getGraceMarkDetails = (req, res) => {
  const id = req.params.id;
  con.query(
    `SELECT * FROM gracemark WHERE GraceMarkID=?`,
    [id],
    (err, result) => {
      if (err || result.length === 0) {
        return res.status(400).json({
          message: "No Gracemark Found",
        });
      }
      return res.json({
        gracemark: result[0],
      });
    }
  );
};

exports.updateGraceMarkDetails = (req, res) => {
  const id = req.params.id;
  con.query(
    `SELECT * FROM gracemark WHERE GraceMarkID=?;`,
    [id],
    (err, result) => {
      if (err || result.length === 0) {
        return res.status(400).json({
          message: "No Gracemark Found",
        });
      }
      if (result) {
        result[0].Description = req.body.description || result[0].Description;
        result[0].GraceMark = req.body.marks || result[0].GraceMark;
        con.query(
          `UPDATE gracemark SET Description=?,GraceMark=? WHERE GraceMarkID=?;UPDATE student SET GraceDesc=?,GraceMark=?`,
          [
            result[0].Description,
            result[0].GraceMark,
            id,
            result[0].Description,
            result[0].GraceMark,
          ],
          (err, result) => {
            if (err || result.length === 0) {
              return res.status(400).json({
                message: "Failed to update",
              });
            }
            return res.json({
              gracemark: result,
            });
          }
        );
      }
    }
  );
};

exports.deleteGraceMarkDetails = (req, res) => {
  const id = req.params.id;
  con.query(
    `DELETE  FROM gracemark WHERE GraceMarkID=?`,
    [id],
    (err, result) => {
      if (err) {
        return res.status(400).json({
          error: "Unable to delete",
        });
      }
      return res.status(400).json({
        message: "Successfully deleted",
      });
    }
  );
};
