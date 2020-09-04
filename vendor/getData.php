<?php

session_start();
require_once 'connect.php';

$id = $_SESSION['user']['id'];
$data2 = mysqli_query($connect, "SELECT `data` FROM `users` WHERE `id` = '$id'");
$data2 = mysqli_fetch_assoc($data2);
$data2 = json_decode($data2['data'], true);


echo json_encode($data2);

?>