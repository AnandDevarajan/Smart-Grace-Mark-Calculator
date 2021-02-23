const jwt = require('jsonwebtoken');
const config = require('../config/db');
const con = config.con;
const asyncHandler = require('express-async-handler');
exports.verifyAuth = asyncHandler(async (req, res, next) => {
  if (req.headers.authorization) {
    try {
      let token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log(decoded);
      con.query(
        `SELECT * FROM STUDENT WHERE RollNum = '${decoded.id}'`,
        (err, result) => {
          if (err) {
            return res.status(400).json({
              message: 'Access denied',
            });
          }
          req.user = result[0];
          next();
        }
      );
    } catch (error) {
      res.status(401).json({
        error: 'Not Autherized',
      });
    }
  }
});
