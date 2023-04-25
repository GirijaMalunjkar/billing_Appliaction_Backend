var express = require('express');
var expenses = express.Router();

const pool = require('../models/database');

expenses.get("/expenses", (req, res) => {
    var sql = "SELECT * FROM  expenses";
    pool.query(sql, function (error, result) {
        if (error) {
            console.log("Error Connecting to DB")
        } else {
            res.send({ status: true, data: result });
        }
    });
});

expenses.get("/expenses/:id", (req, res) => {
    var expensesid = req.params.id;
    var sql = "SELECT FROM * expenses WHERE id=" + expensesid;
    pool.query(sql, function (error, result) {
        if (error) {
            console.log("Error Connecting to DB")
        } else {
            res.send({ status: true, data: result });
        }
    });
});

expenses.post('/expenses', (req, res) => {
    let details = {
        item: req.body.item,
        amount: req.body.amount,
        supplier_name: req.body.supplier_name,
        mode_of_payment: req.body.mode_of_payment,
        created_by: 1,
    };
    let sql = "INSERT INTO expenses SET ?";
    pool.query(sql, details, (error) => {
        console.log(error);
        if (error) {
            res.send({ status: false, message: "expenses Created Fail" });
        } else {
            res.send({ status: true, message: "expenses Created Successfully" });
        }
    })
});

expenses.put("/expenses/:id", (req, res) => {
    let sql =
    "UPDATE expenses SET item='" + req.body.item + 
    "', amount= '" +  req.body.amount +
    "', supplier_name= '" +  req.body.supplier_name +
    "', mode_of_payment= '" +  req.body.mode_of_payment +
    "' WHere id=" +  req.params.id;

    let query = pool.query(sql, (error, result) => {
        if (error) {
            res.send({
                status: false, message: "expenses Update Failed"
            });
        } else {
            res.send({
                status: true, message: "expenses Update Successfully"
            });
        }
    });
});

expenses.delete("/expenses/:id", (req, res) => {
    let sql =
    "UPDATE expenses SET item='" + req.body.item + 
    "', amount= '" +  req.body.amount +
    "', supplier_name= '" +  req.body.supplier_name +
    "', mode_of_payment= '" +  req.body.mode_of_payment +
    "', status= '" +  inacative +
    "' WHere id=" +  req.params.id;

    let query = pool.query(sql, (error, result) => {
        if (error) {
            res.send({
                status: false, message: "expenses Delete Failed"
            });
        } else {
            res.send({
                status: true, message: "expenses Delete Successfully"
            });
        }
    });
});

module.exports = expenses;