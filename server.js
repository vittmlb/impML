/**
 * Created by Vittorio on 10/05/2016.
 */
var express = require('./config/express');

var app = express();

app.listen(3000);

module.exports = app;

console.log(`Server listening on port 3000`);