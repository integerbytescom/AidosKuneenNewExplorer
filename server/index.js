const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const bodyParser = require("body-parser")
const {transactionsAgsAll, transactionsAccount, transactionsTokensAll} = require("./requests");

//app settings
const app = express();
app.use(cors());
app.use(bodyParser());

app.listen(8000, () => console.log('app started'));

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
        console.log(result,'result')
        res.send(result)
    })
});

app.get('/getTransAllTokens',(req,res) => {
    connection.query(transactionsTokensAll, (err,result) => {
        console.log(result,'result')
        res.send(result)
    })
});