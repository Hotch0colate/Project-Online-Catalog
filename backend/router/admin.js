const express = require('express');
const session = require('express-session');
const connection = require('../database');
const router = express.Router();

router.get('/check-order', async (req, res) => {
    try {
        connection.query('select or_.id, name, date_order, total_price from users  \
        join nodejs_crud.order as or_ on or_.user_id = users.id;',
        (err, results, fields) => { 
            return res.status(200).send(results);
        })
    } catch {
        return res.status(500).send();
    }

})

router.get('/detail-order/:id', async (req, res) => {
    const id = req.params.id;
    try{
        connection.query('select product_name, product_price, total , product_price*total as total_price \
        from buy join product on product_id = product.id where order_id = ?', [id], (err, results, fields) =>{
            return res.status(200).send(results);
        })
    }catch{
        return res.statusCode(500);
    }
})

module.exports = router;