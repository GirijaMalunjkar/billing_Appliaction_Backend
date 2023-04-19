var express = require('express');
var billing = express.Router();

const pool = require('../models/database');
const items = require('./items');

billing.get("/billing", (req, res) => {
    var sql = "SELECT * FROM  billing";
    pool.query(sql, function (error, result) {
        if (error) {
            console.log("Error Connecting to DB")
        } else {
            res.send({ status: true, data: result });
        }
    });
});

billing.get("/billing/:id", (req, res) => {
    var billingid = req.params.id;
    var sql = "SELECT FROM * billing WHERE id=" + billingid;
    pool.query(sql, function (error, result) {
        if (error) {
            console.log("Error Connecting to DB")
        } else {
            res.send({ status: true, data: result });
        }
    });
});

billing.post('/billing', (req, res) => {
    let details = {
        invoice_no: req.body.invoice_no,
        bill_date: req.body.bill_date,
        cname: req.body.cname,
        items: req.body.items,
        total: req.body.total,
        discount: req.body.discount,
        recived: req.body.recived,
        balance: req.body.balance,
        note: req.body.note,
        created_by: 1,
        status: 'active'
    };
    let sql = "INSERT INTO billing SET ?";
    pool.query(sql, details, (error) => {
        console.log(error);
        if (error) {
            res.send({ status: false, message: "Billing Created Fail" });
        } else {
            res.send({ status: true, message: "Billing Created Successfully" });
        }
    })
});

billing.put("/billing/:id", (req, res) => {
    let sql =
    "UPDATE billing SET  invoice_no= '" + req.body.invoice_no +
    "', bill_date= '"+ req.body.bill_date +
    "',cname= '" + req.body.cname +
        "',items= '" + req.body.items +
        "',total= '" + req.body.total +
        "',discount= '" + req.body.discount + 
        "',recived= '" + req.body.recived +
        "',balance= '" + req.body.balance +
        "',note= '" + req.body.note +
        "' WHere id=" + req.params.id;

    let query = pool.query(sql, (error, result) => {
        if (error) {
            res.send({
                status: false, message: "Billing Update Failed"
            });
        } else {
            res.send({
                status: true, message: "Billing Update Successfully"
            });
        }
    });
});

billing.delete("/billing/:id", (req, res) => {
    let sql =
    "UPDATE billing SET  invoice_no= '" + req.body.invoice_no +
    "', bill_date= '"+ req.body.bill_date +
    "',cname= '" + req.body.cname +
        "',items= '" + req.body.items +
        "',total= '" + req.body.total +
        "',discount= '" + req.body.discount + 
        "',recived= '" + req.body.recived +
        "',balance= '" + req.body.balance +
        "',note= '" + req.body.note +
        "',status= 'inactive'  WHere id=" + req.params.id;

    let query = pool.query(sql, (error, result) => {
        if (error) {
            res.send({
                status: false, message: "Billing Delete Failed"
            });
        } else {
            res.send({
                status: true, message: "Billing Delete Successfully"
            });
        }
    });
});

billing.get('/billing/:id', (req, res) => {
    //let sql = 'SELECT si.id, i.item, s.id as salesid FROM items i JOIN sales_items si ON i.id = si.item_id JOIN sales s ON s.id = si.sale_id WHERE si.id = ?';

    let query = pool.query(sql, (err, res) => {
        console.log(err);
        if (err) {
            res.send({message:"error"});
        } else {
            res.send({ Message: "Joined Succussesfully" });
        }
    });
});

module.exports = billing;