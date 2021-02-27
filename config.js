/** Common config for message.ly */

// read .env files and make environmental variables
const dotenv = require('dotenv');
dotenv.config();

const DB_URI = (process.env.NODE_ENV === "test")
  ? "postgresql:///messagely_test"
  : "postgresql:///messagely";

console.log("DB_URI being used is: ", DB_URI);

const SECRET_KEY = process.env.SECRET_KEY;

const BCRYPT_WORK_FACTOR = 12;


module.exports = {
  DB_URI,
  SECRET_KEY,
  BCRYPT_WORK_FACTOR,
  port: process.env.PORT
};