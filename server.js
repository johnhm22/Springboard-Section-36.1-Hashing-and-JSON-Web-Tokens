/** Server startup for Message.ly. */
const express = require('express');
const{port} = require('./config');

const app = express();

console.log(`Your port is ${port}`);


app.listen(port, function () {
  console.log("Listening on 3000");
});