<?php

error_reporting(E_ALL);

$transactionsAgsAll = 'SELECT * FROM transactions_ags';
$transactionsTokensAll = 'SELECT * FROM transactions_tokens';
$accountsOldAll = 'SELECT * FROM az9_claimstatus';

$serv = "localhost";
$user = "aidreadonly";
$pass = "dghgh52!eT";
$name = "aid";

$col = 20;
$page = (int)$_GET["page"];
$page = ($page > 0)?$page:1;
$list = $col * $page - $col;

switch($_GET['module']) {

    case "transactionsAgsAll":
        $sql = 'SELECT * FROM transactions_ags LIMIT '.$list.','.$col;
        break;
    case "transactionsTokensAll":
        $sql = 'SELECT * FROM transactions_tokens LIMIT '.$list.','.$col;
        break;
    case "accountsOldAll":
        $sql = 'SELECT * FROM az9_claimstatus LIMIT 0'.$list.','.$col;
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
