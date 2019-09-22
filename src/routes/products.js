const app = require('express').Router();
const mysql = require('../database/mysql-connection');

app.get('/products', (req, res) => {
    // get all records
    const sql = 'SELECT * FROM products';
    mysql.query(sql, (err, rows, fields) => {
        res.json(rows);
    });
});

app.get('/product/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'SELECT * FROM products WHERE id = ?';
    mysql.query(sql, [id], (err, rows, fields) => {
        res.json(rows);
    });
});

app.post('/product/create', (req, res) => {
    const { title, description, price, article, img } = req.body;

    const sql = 'INSERT INTO products (title, description, price, article, img) VALUES (?,?,?,?,?)';
    mysql.query(sql, [title, description, price, article, img], (err, result) => {
        if (err) {
            console.log(err)
            return;
        }

        // select inserted
        mysql.query('SELECT * FROM products WHERE id = ?', [result.insertId], (err, product) => {
            if (err) throw err;
            res.status(201).json(product[0])
        })
    });
});

app.delete('/product/delete/:id', (req, res) => {
    const { id } = req.params;
    // get all records
    const sql = 'DELETE FROM products WHERE id = ?';
    mysql.query(sql, [id], (err, rows, fields) => {
        if (err) {
            console.log(err)
            return;
        }
        res.json(`deleted product ${id}`);
    });
});

app.put('/product/edit/:id', (req, res) => {
    const { title, description, price, article, img, id } = req.body
    const sql = `UPDATE products SET title="${title}", description="${description}", price=${price}, article="${article}", img="${img}" WHERE id=${id}`;
    mysql.query(sql, [title, description, price, article, img, id], (error, results, fields) => {
        if (error) throw error;
        res.json(results);
    });
});

module.exports = app;