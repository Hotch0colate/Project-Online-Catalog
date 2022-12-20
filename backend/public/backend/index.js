var express = require('express');
const connection = require('./database');
var app = express();

app.get('/',function(req,res){
    let sql = "select * from Admins";
    connection.query(sql,function(err, results){
        if (err) throw err;
        res.send(results);
    });
});

app.listen(3000, function() {
    console.log('Server is running on port 3000');
    connection.connect(function(err) {
        if (err) throw err;
        console.log("Connected!");
      })
});
