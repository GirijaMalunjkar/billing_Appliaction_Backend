var express = require('express');
var salesItems = express.Router();

const pool = require('../models/database');

salesItems.get("/salesItems", (req, res) => {
    var sql = "SELECT * FROM  sales_items";
    pool.query(sql, function (error, result) {
        if (error) {
            console.log("Error Connecting to DB")
        } else {
            res.send({ status: true, data: result });
        }
    });
});

salesItems.get("/salesItems/:id", (req, res) => {
    var salesItemsid = req.params.id;
    var sql = "SELECT FROM * sales_items WHERE id=" + salesItemsid;
    pool.query(sql, function (error, result) {
        if (error) {
            console.log("Error Connecting to DB")
        } else {
            res.send({ status: true, data: result });
        }
    });
});

salesItems.post('/salesItems', (req, res) => {
    let details = {
        sale_id: req.body.sale_id,
        item_id: req.body.item_id,
        rate: req.body.rate,
        qty: req.body.qty,
        gst: req.body.gst,
        total: req.body.total,
        created_by: 1,
    };
    let sql = "INSERT INTO sales_items SET ?";
    pool.query(sql, details, (error) => {
        console.log(error);
        if (error) {
            res.send({ status: false, message: "salesItems Created Fail" });
        } else {
            res.send({ status: true, message: "salesItems Created Successfully" });
        }
    })
});

salesItems.put("/salesItems/:id", (req, res) => {
    let sql =
        "UPDATE sales_items SET item= '" + req.body.item +
        "', email= '" + req.body.email +
        "', rate= '" + req.body.rate +
        "', qty= '" + req.body.qty +
        "', gst= '" + req.body.gst +
        "', total= '" + req.body.total +
        "' WHere id=" + req.params.id;

    let query = pool.query(sql, (error, result) => {
        if (error) {
            res.send({
                status: false, message: "salesItems Update Failed"
            });
        } else {
            res.send({
                status: true, message: "salesItems Update Successfully"
            });
        }
    });
});

salesItems.delete("/salesItems/:id", (req, res) => {
    let sql =
        "UPDATE sales_items SET item= '" + req.body.item +
        "', email= '" + req.body.email +
        "', rate= '" + req.body.rate +
        "', qty= '" + req.body.qty +
        "', gst= '" + req.body.gst +
        "', total= '" + req.body.total +
        "', status= 'inactive' WHere id=" + req.params.id;

    let query = pool.query(sql, (error, result) => {
        if (error) {
            res.send({
                status: false, message: "salesItems Deleted Failed"
            });
        } else {
            res.send({
                status: true, message: "salesItems Deleted Successfully"
            });
        }
    });
});

salesItems.get('/salesItems/:id', (req, res) => {
    let sql = 'SELECT si.id, i.item, s.id as salesid FROM items i JOIN sales_items si ON i.id = si.item_id JOIN sales s ON s.id = si.sale_id WHERE si.id = ?';

    let query = pool.query(sql, (err, res) => {
        console.log(err);
        if (err) {
            res.send({message:"error"});
        } else {
            res.send({ Message: "Joined Succussesfully" });
        }
    });
});

module.exports = salesItems;