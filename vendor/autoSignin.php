<?php

  if ($_COOKIE['user'] !== ''){
    require_once './vendor/connect.php';
    $id = $_COOKIE['user'];
    $id = intval($id);
    $check_user = mysqli_query($connect, "SELECT * FROM `users` WHERE `id` = '$id'");


	  if (mysqli_num_rows($check_user) > 0) {

		$user2 = mysqli_fetch_assoc($check_user);

		$_SESSION['user'] = [
			"id" => $user2['id'],
			"email" => $user2['email'],
			"login" => $user2['login']
    ];
    }
  }
  
?>