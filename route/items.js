var express = require('express');
var items = express.Router();

const pool = require('../models/database');

items.get("/items", (req, res) => {
    var sql = "SELECT * FROM  items";
    pool.query(sql, function (error, result) {
        if (error) {
            console.log("Error Connecting to DB")
        } else {
            res.send({ status: true, data: result });
        }
    });
});

items.get("/items/:id", (req, res) => {
    var itemsid = req.params.id;
    var sql = "SELECT FROM * items WHERE id=" + itemsid;
    pool.query(sql, function (error, result) {
        if (error) {
            console.log("Error Connecting to DB")
        } else {
            res.send({ status: true, data: result });
        }
    });
});

items.post('/items', (req, res) => {
    let details = {
        item: req.body.item,
        hsn: req.body.hsn,
        gst: req.body.gst,
        rate: req.body.rate,
        created_by: 1,
    };
    let sql = "INSERT INTO items SET ?";
    pool.query(sql, details, (error) => {
        console.log(error);
        if (error) {
            res.send({ status: false, message: "Items Created Fail" });
        } else {
            res.send({ status: true, message: "Items Created Successfully" });
        }
    })
});

items.put("/items/:id", (req, res) => {
    let sql =
    "UPDATE items SET item='" + req.body.item + 
    "', hsn= '" +  req.body.hsn +
    "', gst= '" +  req.body.gst +
    "', rate= '" +  req.body.rate +
    "' WHere id=" +  req.params.id;

    let query = pool.query(sql, (error, result) => {
        if (error) {
            res.send({
                status: false, message: "items Update Failed"
            });
        } else {
            res.send({
                status: true, message: "items Update Successfully"
            });
        }
    });
});

items.delete("/items/:id", (req, res) => {
    let sql =
    "UPDATE items SET item='" + req.body.item + 
    "', hsn= '" +  req.body.hsn +
    "', gst= '" +  req.body.gst +
    "', rate= '" +  req.body.rate +
    "', status= '" +  inacative +
    "' WHere id=" +  req.params.id;

    let query = pool.query(sql, (error, result) => {
        if (error) {
            res.send({
                status: false, message: "items Delete Failed"
            });
        } else {
            res.send({
                status: true, message: "items Delete Successfully"
            });
        }
    });
});

items.get('/getitemsReport/:id', (req, res) => {
    let sql = 'SELECT i.item, i.hsn, i.gst, i.rate, si.rate, si.qty, si.gst, si.total FROM items AS i, sales_items AS si WHERE i.id = si.id;';

    let query = pool.query(sql, (err, result) => {
        console.log(err);
        if (err) {
            res.send({message:"error"});
        } else {
            res.send({ Message: result });
        }
    });
});


module.exports = items;