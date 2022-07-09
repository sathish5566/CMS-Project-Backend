'use strict';
const mysql = require('mysql')
//local mysql db connection
const dbConn = mysql.createConnection({
    host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'awan_db',multipleStatements:true
});
dbConn.connect(function(err){
    if(err) throw err;
    console.log("Database Connected!");
});
module.exports =dbConn;

/*'use strict';
const mysql = require('mysql');
//local mysql db connection
const dbConn = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'demo_db'
});
dbConn.connect(function(err) {
  if (err) throw err;
  console.log("Database Connected!");
});
module.exports = dbConn;*/