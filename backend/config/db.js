const mysql = require("mysql");
require("dotenv").config();

config = {
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  multipleStatements: true,
};

const con = mysql.createConnection(config);
con.connect((err) => {
  if (err) throw err;
  console.log("DB CONNECTED");
});

module.exports = {
  con: mysql.createConnection(config),
};
