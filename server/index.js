const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const path = require("path");
const bodyParser = require("body-parser");
const {transactionsAgsAll, transactionsTokensAll, accountsOldAll} = require("./requests");

//app settings
const app = express();
app.use(cors());
app.use(bodyParser());

app.use(express.static(path.join(__dirname,'../client/build')));
const PORT = process.env.PORT || 8000;

// Add headers for error CORS
app.use(function (req, res, next) {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');
    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);
    // Pass to next layer of middleware
    next();
});

app.listen(PORT);

//connect to mysql database (ENTER YOUR DATA)
const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "aidos_test",//YOUR DATABASE
    password: ""
});

//get all transactions from "transactions_ags" table
app.get('/getTransAll',(req,res) => {
    connection.query(transactionsAgsAll, (err,result) => {
        // console.log(result,'result');
        res.send(result);
    })
});

//transactions for other tokens
app.get('/getTransAllTokens',(req,res) => {
    connection.query(transactionsTokensAll, (err,result) => {
        // console.log(result,'result');
        res.send(result);
    })
});

//old data
app.get('/getAccountsOld',(req,res) => {
    connection.query(accountsOldAll, (err,result) => {
        // console.log(result,'result');
        res.send(result);
    })
});
