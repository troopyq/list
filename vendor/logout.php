<?php 

session_start();
setcookie('user', $_SESSION['user']['id'], time() - 3600 * 24 *30, "/");
unset($_SESSION['user']);
header('Location: ../index.php');

 ?>