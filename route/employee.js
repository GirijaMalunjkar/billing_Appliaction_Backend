var express = require('express');
var employee = express.Router();

const pool = require('../models/database');

employee.get("/employee", (req, res) => {
    var sql = "SELECT * FROM  employee";
    pool.query(sql, function (error, result) {
        if (error) {
            console.log("Error Connecting to DB")
        } else {
            res.send({ status: true, data: result });
        }
    });
});

employee.get("/employee/:id", (req, res) => {
    var employeeid = req.params.id;
    var sql = "SELECT FROM * employee WHERE id=" + employeeid;
    pool.query(sql, function (error, result) {
        if (error) {
            console.log("Error Connecting to DB")
        } else {
            res.send({ status: true, data: result });
        }
    });
});

employee.post('/employee', (req, res) => {
    let details = {
       name: req.body.name,
       phone: req.body.phone,
       email: req.body.email,
       address: req.body.address,
       bank: req.body.bank,
       account_no: req.body.account_no,
       ifsc_no: req.body.ifsc_no,
       id_proof: req.body.id_proof,
    };
    let sql = "INSERT INTO employee SET ?";
    pool.query(sql, details, (error) => {
        console.log(error);
        if (error) {
            res.send({ status: false, message: "Employee Created Fail" });
        } else {
            res.send({ status: true, message: "Employee Created Successfully" });
        }
    })
});

employee.put("/employee/:id", (req, res) => {
    let sql =
    "UPDATE employee SET name='" + req.body.name +
    "' phone='" + req.body.phone +
    "' email='" + req.body.email +
    "' address='" + req.body.address +
    "' back='" + req.body.back +
    "' account_no='" + req.body.account_no +
    "' ifsc_no='" + req.body.ifsc_no +
    "' id_proof='" + req.body.id_proof +
    "' WHere id=" +  req.params.id;

    let query = pool.query(sql, (error, result) => {
        if (error) {
            res.send({
                status: false, message: "Employee Update Failed"
            });
        } else {
            res.send({
                status: true, message: "Employee Update Successfully"
            });
        }
    });
});

employee.delete("/employee/:id", (req, res) => {
    let sql =
    "UPDATE employee SET name='" + req.body.name +
    "' phone='" + req.body.phone +
    "' email='" + req.body.email +
    "' address='" + req.body.address +
    "' back='" + req.body.back +
    "' account_no='" + req.body.account_no +
    "' ifsc_no='" + req.body.ifsc_no +
    "' id_proof='" + req.body.id_proof +
    "' status='inactive' WHere id=" +  req.params.id;


    let query = pool.query(sql, (error, result) => {
        if (error) {
            res.send({
                status: false, message: "Employee Delete Failed"
            });
        } else {
            res.send({
                status: true, message: "Employee Delete Successfully"
            });
        }
    });
});

module.exports = employee;