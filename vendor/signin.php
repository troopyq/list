<?php 

	session_start();
	require_once 'connect.php';


	$login = trim($_POST['login']);
	$email = trim($_POST['login']);
	$password = trim($_POST['password']);

	if ($login === '' || $password === '') {
		$response = [
			"status" => false,
			"message" => 'Введите данные'
		];

		echo json_encode($response);
		exit();
	}

	$password = md5($password) . 'mc4f3g8e2k1';

	$check_user = mysqli_query($connect, "SELECT * FROM `users` WHERE (`email` = '$login' OR `login` = '$login') AND `password` = '$password'");


	if (mysqli_num_rows($check_user) > 0) {

		$user = mysqli_fetch_assoc($check_user);

		// $_SESSION['user'] = [
		// 	"id" => $user['id'],
		// 	"email" => $user['email'],
		// 	"login" => $user['login']
		// ];

		setcookie('user', $user['id'], time() + 3600 * 24 * 30, "/");

		$response = [
			"status" => true,
			"message" => 'Вы авторизовались'
		];

		echo json_encode($response);

		

	} else {

		$response = [
			"status" => false,
			"message" => 'Неверный логин или пароль'
		];

		echo json_encode($response);

	}
 ?>

 
