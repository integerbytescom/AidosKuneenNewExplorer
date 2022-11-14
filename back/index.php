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

//https://explorer.aidoskuneen.com/index.php?module=transactionsAgsAll&limit=100
//https://explorer.aidoskuneen.com/index.php?module=transactionsAgsAll
//https://explorer.aidoskuneen.com/index.php?module=transactionsTokensAll
//https://explorer.aidoskuneen.com/index.php?module=accountsOldAll

if($_GET['limit'] == 100)
    $limit = " LIMIT 100 ";
else
    $limit = "";

switch($_GET['module']) {

    case "transactionsAgsAll":
        $sql = 'SELECT * FROM transactions_ags'.$limit;
        //$sql = 'SELECT * FROM transactions_ags LIMIT '.$list.','.$col;|
        break;
    case "transactionsTokensAll":
        $sql = 'SELECT * FROM transactions_tokens';
        //$sql = 'SELECT * FROM transactions_tokens LIMIT '.$list.','.$col;
        break;
    case "accountsOldAll":
        $sql = 'SELECT * FROM az9_claimstatus';
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
