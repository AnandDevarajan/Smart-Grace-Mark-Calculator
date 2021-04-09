const jwt = require("jsonwebtoken");
const config = require("../config/db");
const con = config.con;

exports.verifyStudent = async (req, res, next) => {
  if (req.headers.authorization) {
    try {
      let token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log(decoded);
      con.query(
        `SELECT * FROM STUDENT WHERE RollNum = '${decoded.id}'`,
        (err, result) => {
          if (result.length === 0 || err) {
            return res.status(400).json({
              message: "ACCESS DENIED",
            });
          }
          req.user = result[0];
          next();
        }
      );
    } catch (error) {
      res.status(401).json({
        message: "Not Autherized",
      });
    }
  }
};

exports.verifyFaculty = async (req, res, next) => {
  if (req.headers.authorization) {
    try {
      let token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log(decoded);
      con.query(
        `SELECT * FROM FACULTY WHERE FacultyID = '${decoded.id}'`,
        (err, result) => {
          if (result.length === 0 || err) {
            return res.status(400).json({
              message: "ACCESS DENIED",
            });
          }
          req.user = result[0];
          next();
        }
      );
    } catch (error) {
      res.status(401).json({
        message: "Not Autherized",
      });
    }
  }
};

exports.verifyAdmin = async (req, res, next) => {
  if (req.headers.authorization) {
    try {
      let token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log(decoded.id);
      con.query(
        `SELECT * FROM ADMINISTRATOR WHERE adminID = '${decoded.id}'`,
        (err, result) => {
          if (result.length === 0 || err) {
            return res.status(400).json({
              message: "ACCESS DENIED",
            });
          }
          req.user = result[0];
          next();
        }
      );
    } catch (error) {
      res.status(401).json({
        message: "Not Autherized",
      });
    }
  }
};

exports.admin = (req, res, next) => {
  if (req.user && req.user.role === 3) {
    next();
  } else {
    res.status(401).json({
      message: "Not authorized as an Admin",
    });
  }
};

exports.faculty = (req, res, next) => {
  if (req.user && req.user.role === 2) {
    next();
  } else {
    res.status(401).json({
      message: "Not authorized as an Faculty",
    });
  }
};
