<?php

session_start();
require_once 'connect.php';


header("Content-Type: application/json");

$postData = file_get_contents('php://input');
$user = json_decode($postData);


$id = $_SESSION['user']['id'];
$data = json_encode($user, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES | JSON_NUMERIC_CHECK);

mysqli_query($connect, "UPDATE `users` SET `data` = '".$data."' WHERE `users`.`id`='$id' ");


?>