//import libraries
const express = require('express');
const bodyparser = require('body-parser');
const cors = require('cors');

var app = express();
app.use(express.json());

//MiddleWares
app.use(cors());
app.use(bodyparser.json());

//Server Connection
const port = 8080;

app.listen(port, () => {
    console.log('Server Start At Port :' + port)
});

//testing server
app.get("/",(req,res) => {
    res.send("Test");
});

//api
const clientMaster = require('./route/clientMaster');
const items = require('./route/items');
const sales = require('./route/sales');
const salesItems = require('./route/salesItems');
const profile = require('./route/profile');

app.use('/api',clientMaster)
app.use('/api',items)
app.use('/api',sales)
app.use('/api',salesItems)
app.use('/api',profile)


