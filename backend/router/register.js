const express = require('express');
const session = require('express-session');
const connection = require('../database');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const verifyToken = require('../token');



router.post('/sign-up', (req, res) => {
    const { name, email, password } = req.body;
    try {
        connection.query(
            'insert into users(name, email, password) values(?, ?, ?)', [name, email, password], (err, result, fields) => {
                if (err) {
                    return res.status(400).send(err.message);
                }
                return res.status(200).json({ message: "New user successfully created!" });
            }
        )
    } catch (err) {
        return res.status(500).send();
    }
})


router.post('/sign-in', (req, res) => {
    try {
        var email = req.body.email;
        var password = req.body.password;
        if (email && password) {
            connection.query("SELECT * FROM users WHERE email = ? AND password = ?", [email, password], function (error, results, fields) {
                if (results?.length !== 0) {
                    const token = uuidv4();
                    connection.query("insert into access values(?, ?)", [token, results[0].id]);
                    res.send({token:token});
                } else {
                    res.status(401).send('Incorrect Username and/or Password');
                }
                res.end();
            });
        } else {
            res.status(401).send('Please enter Username and password');
            res.end();
        }
    } catch {
        return res.statusCode(500);
    }
});

router.delete('/sign-out', verifyToken, (req, res) => {
    try {
        const token = req.token;
        connection.query('delete from access where token = ?', [token], (err, result, fields) => {
            if (err) {
                return res.status(400).send(err.message);
            }
            else {
                return res.status(200).send();
            }
        })
    } catch {
        return res.statusCode(500);
    }
});


module.exports = router
