const config = require('../config/db');
const con = config.con;
const { generateToken } = require('../utils/auth');
const bcrypt = require('bcrypt');

exports.authAdmin = (req, res) => {
  const { email, password } = req.body;
  con.query(
    `SELECT * FROM ADMINISTRATOR WHERE EmailID=?`,
    email,
    (err, result) => {
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
      [name, email, phone, address, dob, gender, hash],
      (err, result) => {
        if (err) {
          return res.status(400).json({
            message: 'Unable to create Admin',
          });
        }
        if (result) {
          con.query(
            `SELECT * FROM ADMINISTRATOR  WHERE EmailID='${email}'`,
            (err, result) => {
              if (result.length === 0 || err) {
                return res.status(400).json({
                  message: 'No user found',
                });
              }
              res.json({
                result: result[0],
                token: generateToken(result[0].adminID),
              });
            }
          );
        }
      }
    );
  });
};
