const express = require('express');
const session = require('express-session');
const connection = require('../database');
const router = express.Router();
const verifyToken = require('../token');

function blobToBase64(blob) {
    let buffer = Buffer.from(blob);
    return buffer.toString('base64');
}

router.get('/', async (req, res) => {
    try {
        connection.query('select * from product', (err, results, fields) => {
            if (err) {
                return res.status(400).send(err.message);
            }
            let data = [];
            for (let i of results) {
                data.push({
                    id: i.id,
                    product_name: i.product_name,
                    product_price: i.product_price,
                    total_product: i.total_product,
                    image: blobToBase64(i.image)
                })
            }
            return res.status(200).send(data);
        })
    } catch {
        return res.statusCode(500);
    }
})

function sumTotal(itemm) {
    return (total, item) => {
        let total_product = itemm.filter((item_) => item_.id == item.id)[0].total_product
        return total + (item.product_price * total_product)
    }
}

async function createOrder(sum_total, userId) {
    return new Promise((resolve, reject) => {
        connection.query(`insert into nodejs_crud.order(total_price, user_id) values(?, ?);`, [sum_total, userId],
            (err, results, fields) => {
                if (results) {
                    resolve(results.insertId);
                }
                resolve(null);
            });
    });

}

function createOrderIntoBuy(order_id, product_id, total) {
    connection.query(`update nodejs_crud.product set total_product = total_product-? where id = ?`, [total, product_id]);
    connection.query(`insert into nodejs_crud.buy(product_id, total, order_id) values(?, ?, ?);`, [product_id, total, order_id]);
}


router.post('/order', verifyToken, async (req, res) => {
    try {
        const data = req.body.data;
        const userId = req.userId
        const itemm = data.map((item) => item.id);
        let func = sumTotal(data)
        connection.query(`select * from product where id in (${itemm.join()}) `, async (err, results, fields) => {
            if (err) {
                return res.status(400).send(err.message);
            }
            let sum_total = results.reduce(func, 0)
            let order_id = await createOrder(sum_total, userId)
            data.map((item) => createOrderIntoBuy(order_id, item.id, item.total_product));
            return res.status(200).send();
        });
    } catch {
        return res.statusCode(500);
    }
})


router.post('/order', verifyToken, async (req, res) => {
    try {
        const data = req.body.data;
        const userId = req.userId
        const itemm = data.map((item) => item.id);
        let func = sumTotal(data)
        connection.query(`select * from product where id in (${itemm.join()}) `, async (err, results, fields) => {
            if (err) {
                return res.status(400).send(err.message);
            }
            let sum_total = results.reduce(func, 0)
            let order_id = await createOrder(sum_total, userId)
            data.map((item) => createOrderIntoBuy(order_id, item.id, item.total_product));
            return res.status(200).json({
                message:"create order successfully"
            });
        });
    } catch {
        return res.statusCode(500);
    }
})

router.delete('/delete/:id', async (req, res) => {
    try {
        const {id} = req.params
        connection.query(`delete from product where id = ${id}`, async (err) => {
            if (err) {
                return res.status(400).send(err.message);
            }
            return res.status(200).json({
                message:"delete success"
            });
        });
    } catch {
        return res.statusCode(500);
    }
})

router.post('/updateprice/:id', async (req, res) => {
    try {
        const {id} = req.params
        const newprice = req.body.newprice;
        connection.query(`update nodejs_crud.product set product_price = ? where id = ?`, [newprice, id], async (err, results, fields) => {
            if (err) {
                return res.status(400).send(err.message);
            }
            return res.status(200).json({
                message:"update price successfully"
            });
        });
    } catch {
        return res.statusCode(500);
    }
})



module.exports = router;