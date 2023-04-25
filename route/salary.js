var express = require('express');
var salary = express.Router();

const pool = require('../models/database');

salary.get("/salary", (req, res) => {
    var sql = "SELECT * FROM  salary";
    pool.query(sql, function (error, result) {
        if (error) {
            console.log("Error Connecting to DB")
        } else {
            res.send({ status: true, data: result });
        }
    });
});

salary.get("/salary/:id", (req, res) => {
    var salaryid = req.params.id;
    var sql = "SELECT FROM * salary WHERE id=" + salaryid;
    pool.query(sql, function (error, result) {
        if (error) {
            console.log("Error Connecting to DB")
        } else {
            res.send({ status: true, data: result });
        }
    });
});

salary.post('/salary',(req, res) => {
    let details = {
        employee_id: req.body.employee_id,
        salary_date: req.body.salary_date,
        amount: req.body.amount,
        mode: req.body.mode,
        created_by: 1,
        status: 'active',
    };
    let sql = "INSERT INTO salary SET ?";
    pool.query(sql, details, (error) => {
        console.log(error);
        if (error) {
            res.send({ status: false, message: "Salary Created Fail" });
        } else {
            res.send({ status: true, message: "Salary Created Successfully" });
        }
    });
});

salary.put("/salary/:id", (req, res) => {
    let sql =
        "UPDATE salary SET employee_id='" + req.body.employee_id +
        "', salary_date='" + req.body.salary_date +
        "', amount='" + req.body.amount +
        "', mode='" + req.body.mode +
        "' WHere id=" + req.params.id;

    let query = pool.query(sql, (error, result) => {
        if (error) {
            res.send({
                status: false, message: "Salary Update Failed"
            });
        } else {
            res.send({
                status: true, message: "Salary Update Successfully"
            });
        }
    });
});

salary.delete("/salary/:id", (req, res) => {
    let sql =
        "UPDATE salary SET employee_id='" + req.body.employee_id +
        "', salary_date='" + req.body.salary_date +
        "', amount='" + req.body.amount +
        "', mode='" + req.body.mode +
        "', status= 'inactive' WHere id=" + req.params.id;

    let query = pool.query(sql, (error, result) => {
        if (error) {
            res.send({
                status: false, message: "Salary Delete Failed"
            });
        } else {
            res.send({
                status: true, message: "Salary Delete Successfully"
            });
        }
    });
});

salary.get('/getsalary/:id', (req, res) => {
    var sql = 'SELECT e.name, e.phone, e.address, e.bank, e.account_no, e.ifsc_no, e.id_proof, s.* FROM salary AS s, employee AS e WHERE e.id = s.employee_id';

    var query = pool.query(sql, (err, result) => {
        console.log(err);
        if (err) {
            res.send({ message: "error" });
        } else {
            res.send({ Message: result , msg:"Joined Successfully"});
        }
    });
});

module.exports = salary;