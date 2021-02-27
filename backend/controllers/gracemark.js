const config = require('../config/db');
const con = config.con;

exports.addGraceMark = (req, res) => {
  const { description, mark } = req.body;

  con.query(
    `INSERT INTO GRACEMARK (Description,GraceMark) VALUES (?,?)`,
    [description, mark],
    (err, result) => {
      if (err) {
        return res.status(400).json({
          message: 'Unable to add Grace Mark details',
        });
      }
      if (result) {
        con.query(
          `SELECT * FROM GRACEMARK WHERE Description='${description}'`,
          (err, result) => {
            if (err) {
              return res.status(400).json({
                message: 'No Grace Mark Details found',
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
