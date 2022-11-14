<?php

header('Access-Control-Allow-Origin: *');

error_reporting(0); //E_ALL

// config

$serv = "localhost";
$user = "aidreadonly";
$pass = "dghgh52!eT";
$name = "aid";

$col = 20;
$page = (int)$_GET["page"];
$page = ($page > 0)?$page:1;
$list = $col * $page - $col;

// /back.php?module=transactionsAgsAll&limit=100
// /back.php?module=transactionsAgsAll
// /back.php?module=transactionsTokensAll
// /back.php?module=accountsOldAll

// 0x67b508dd51d3278ccf0ff513ff4e31e0414b806a - address
// /back.php?module=address&address=0x67b508dd51d3278ccf0ff513ff4e31e0414b806a

// 0x4da7e2d5750e951a1ebd22a40760d42298f228e72eb6d19fa07bcdc79ae07b94&l - hash
// /back.php?module=hash&hash=0x67b508dd51d3278ccf0ff513ff4e31e0414b806a

// FEAZJYPOC9YFMBEVMTEDUKCDDXSKWJFPTAKPILOGAWRZBCMXZXFMJSNTIHPHMMPXBUGELENEJKNCPPOYTCONSRBWZ9
// /back.php?module=old&old=0x67b508dd51d3278ccf0ff513ff4e31e0414b806a

if($_GET['limit'] == 100)
    $limit = " LIMIT 100 ";
else
    $limit = "";

switch($_GET['module']) {

    case "address":

        if((string)$_GET['address'] != "") {

            $sql = "SELECT * 
            FROM balances 
            WHERE address='" . (string)$_GET['address'] . "'";
        }

        break;

    case "hash":

        if((string)$_GET['hash'] != "") {

            $sql = "SELECT * 
            FROM transactions_ags 
            WHERE transactionhash='" . (string)$_GET['hash'] . "'";
        }

        break;

    case "old":

        //

        break;

    case "transactionsAgsAll":

        $sql = "SELECT * FROM transactions_ags ORDER BY log_dat DESC ".$limit;
        //$sql = 'SELECT * FROM transactions_ags LIMIT '.$list.','.$col;|

        break;

    case "transactionsTokensAll":

        $sql = "SELECT * FROM transactions_tokens ORDER BY timestamp DESC";
        //$sql = 'SELECT * FROM transactions_tokens LIMIT '.$list.','.$col;
        break;

    case "accountsOldAll":

        $sql = "SELECT * FROM az9_claimstatus";
        //$sql = 'SELECT * FROM az9_claimstatus LIMIT 0'.$list.','.$col;
        break;

    default:
        $all['error'] = true;
        break;
}

//echo $sql; die();

if(!$all['error']) {

    mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);
    $mysqli = new mysqli($serv, $user, $pass, $name);
    $query = $sql;
    $result = $mysqli->query($query);

    while ($row = $result->fetch_object()) {
        $all[] = $row;
    }
}

print json_encode($all);