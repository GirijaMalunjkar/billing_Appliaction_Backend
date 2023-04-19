var express = require('express');
var salery = express.Router();

const pool = require('../models/database');

salery.get("/salery", (req, res) => {
    var sql = "SELECT * FROM  salery";
    pool.query(sql, function (error, result) {
        if (error) {
            console.log("Error Connecting to DB")
        } else {
            res.send({ status: true, data: result });
        }
    });
});

salery.get("/salery/:id", (req, res) => {
    var saleryid = req.params.id;
    var sql = "SELECT FROM * salery WHERE id=" + saleryid;
    pool.query(sql, function (error, result) {
        if (error) {
            console.log("Error Connecting to DB")
        } else {
            res.send({ status: true, data: result });
        }
    });
});

salery.post('/salery',(req, res) => {
    let details = {
        employee_name: req.body.employee_name,
        salery_date: req.body.salery_date,
        salery_ammount: req.body.salery_ammount,
        salery_mode: req.body.salery_mode,
    };
    let sql = "INSERT INTO salery SET ?";
    pool.query(sql, details, (error) => {
        console.log(error);
        if (error) {
            res.send({ status: false, message: "Salery Created Fail" });
        } else {
            res.send({ status: true, message: "Salery Created Successfully" });
        }
    })
});

salery.put("/salery/:id", (req, res) => {
    let sql =
        "UPDATE salery SET employee_name='" + req.body.employee_name +
        "', employee_date='" + req.body.employee_date +
        "', salery_ammount='" + req.body.salery_ammount +
        "', salery_mode='" + req.body.salery_mode +
        "' WHere id=" + req.params.id;

    let query = pool.query(sql, (error, result) => {
        if (error) {
            res.send({
                status: false, message: "Salery Update Failed"
            });
        } else {
            res.send({
                status: true, message: "Salery Update Successfully"
            });
        }
    });
});

salery.delete("/salery/:id", (req, res) => {
    let sql =
        "UPDATE salery SET employee_name='" + req.body.employee_name +
        "', employee_date='" + req.body.employee_date +
        "', salery_ammount='" + req.body.salery_ammount +
        "', salery_mode='" + req.body.salery_mode +
        "', status= 'inactive' WHere id=" + req.params.id;

    let query = pool.query(sql, (error, result) => {
        if (error) {
            res.send({
                status: false, message: "Salery Delete Failed"
            });
        } else {
            res.send({
                status: true, message: "Salery Delete Successfully"
            });
        }
    });
});

salery.get('/salery/:id', (req, res) => {
    //let sql = 'SELECT si.id, i.item, s.id as salesid FROM items i JOIN sales_items si ON i.id = si.item_id JOIN sales s ON s.id = si.sale_id WHERE si.id = ?';

    let query = pool.query(sql, (err, res) => {
        console.log(err);
        if (err) {
            res.send({ message: "error" });
        } else {
            res.send({ Message: "Joined Succussesfully" });
        }
    });
});

module.exports = salery;