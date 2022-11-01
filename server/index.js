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

app.use(express.static(path.join(__dirname,'../client/build')))
const PORT = process.env.PORT || 5000;
app.listen(PORT);

//connect to mysql database (ENTER YOUR DATA)
const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "aidoskuneen",//YOUR DATABASE
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
