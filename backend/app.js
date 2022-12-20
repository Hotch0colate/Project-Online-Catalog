const express = require('express');
const connection = require('./database');
var bodyParser = require('body-parser');
const session = require('express-session');
var path = require('path');
const app = express();
const cors = require('cors');

app.use(cors({     origin: '*' }));
app.use(express.json());
app.use('/admin',require('./router/admin'))
app.use('/auth',require('./router/register'));
app.use('/product',require('./router/product'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


//test
connection.connect((err) =>{
    if(err) {
        console.log('Error connecting to MYSQL database = ', err)
        return;
    }
    console.log('MYSQL successfully connected!');
})

app.listen(4000, () => console.log('Server is running on port 4000'));