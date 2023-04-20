var express = require('express');
var sales = express.Router();

const pool = require('../models/database');

sales.get("/sales", (req, res) => {
    var sql = "SELECT * FROM  sales";
    pool.query(sql, function (error, result) {
        if (error) {
            console.log("Error Connecting to DB")
        } else {
            res.send({ status: true, data: result });
        }
    });
});

sales.get("/sales/:id", (req, res) => {
    var salesid = req.params.id;
    var sql = "SELECT FROM * sales WHERE id=" + salesid;
    pool.query(sql, function (error, result) {
        if (error) {
            console.log("Error Connecting to DB")
        } else {
            res.send({ status: true, data: result });
        }
    });
});

sales.post('/sales', (req, res) => {
    let details = {
        cid: req.body.cid,
        total: req.body.total,
        gst: req.body.gst,
        discount: req.body.discount,
        place_of_supply: req.body.place_of_supply,
        cgst: req.body.cgst,
        sgst: req.body.sgst,
        igst: req.body.igst,
        grandtotal: req.body.grandtotal,
        bill_date: req.body.bill_date,
        due_date: req.body.due_date,
        invoice_no: req.body.invoice_no,
        created_by: 1,
        status: 'active',
    };
    let sql = "INSERT INTO sales SET ?";
    pool.query(sql, details, (error) => {
        console.log(error);
        if (error) {
            res.send({ status: false, message: "Sales Created Fail" });
        } else {
            res.send({ status: true, message: "Sales Created Successfully" });
        }
    })
});

sales.put("/sales/:id", (req, res) => {
    let sql =
    "UPDATE sales SET cid='" + req.body.cid + 
    "', total= '" +  req.body.total +
    "', gst= '" +  req.body.gst +
    "', discount= '" +  req.body.discount +
    "', place_of_supply= '" +  req.body.place_of_supply +
    "', cgst= '" +  req.body.cgst +
    "', sgst= '" +  req.body.sgst +
    "', igst= '" +  req.body.igst +
    "', grandtotal= '" +  req.body.grandtotal +
    "', bill_date= '" +  req.body.bill_date +
    "', due_date= '" +  req.body.due_date +
    "', invoice_no= '" +  req.body.invoice_no +
    "', WHere id=" +  req.params.id;

    let query = pool.query(sql, (error, result) => {
        if (error) {
            res.send({
                status: false, message: "Sales Update Failed"
            });
        } else {
            res.send({
                status: true, message: "Sales Update Successfully"
            });
        }
    });
});

sales.delete("/sales/:id", (req, res) => {
    let sql =
    "UPDATE sales SET cid='" + req.body.cid + 
    "', total= '" +  req.body.total +
    "', gst= '" +  req.body.gst +
    "', discount= '" +  req.body.discount +
    "', place_of_supply= '" +  req.body.place_of_supply +
    "', cgst= '" +  req.body.cgst +
    "', sgst= '" +  req.body.sgst +
    "', igst= '" +  req.body.igst +
    "', grandtotal= '" +  req.body.grandtotal +
    "', bill_date= '" +  req.body.bill_date +
    "', due_date= '" +  req.body.due_date +
    "', invoice_no= '" +  req.body.invoice_no +
    "', company_id= '" +  req.body.company_id +
    "', status= 'inactive' WHere id=" +  req.params.id;

    let query = pool.query(sql, (error, result) => {
        if (error) {
            res.send({
                status: false, message: "Sales Deleted Failed"
            });
        } else {
            res.send({
                status: true, message: "Sales Deleted Successfully"
            });
        }
    });
});

sales.get('/getReport/:id', (req, res) => {
    let sql = 'SELECT s.*, c.name, c.phone, c.email FROM sales AS s, client_master AS c WHERE c.id = s.cid';

    let query = pool.query(sql, (err, res) => {
        console.log(err);
        if (err) {
            res.send({message:"error"});
        } else {
            res.send({ Message: "Joined Succussesfully" });
        }
    });
});

module.exports = sales;