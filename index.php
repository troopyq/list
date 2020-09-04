<?php 
  session_start();
  $upd = 15;

  require ('./vendor/autoSignin.php');

?>

<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8">
  <link rel="icon" href="favicon.ico">
  <!-- <meta name="viewport" content="width=device-width, initial-scale=1.0"> -->
    <meta name="viewport" content="width=device-width,
                                    initial-scale=1,
                                    maximum-scale=1,
                                    user-scalable=0,
                                    shrink-to-fit=no">
  <title>To Do List</title>
  <link rel="stylesheet" href="css/style.css?v=<?= $upd?>">
</head>
<body>

  <?php if ($_COOKIE['user'] != ''): ?>
<div class="profile">
  <div class="profile__header">
    <span class="profile__login profile__text isButton">
    <div class="profile__img"><img src="" alt=""></div>
              <?= $_SESSION['user']['login']?></span>
    <span class="profile__email profile__text isButton"><?= $_SESSION['user']['email']?></span>
    <form id="logout" action="vendor/logout.php">
    <button class="profile__text isButton" type="submit">Выход</button>
    </form>
  </div>
</div> 
 <?php endif; ?>


  <header>
    <div class="container">
      <div class="row">
        <div class="logo"><span class="logo__span">To Do List</span></div>

 
        <!-- <span style="color: red; font-size: 3rem;"><?= $_COOKIE['user']?></span> -->

        <?php if ($_COOKIE['user'] == ''): ?>
        <button class="login header__btn-log isButton">Войти</button>
        <? else:?>
        <div class="profile-btn">
          <button class="header__btn-log isButton">Профиль</button>
        </div>
        <? endif;?>

        <button class="btn__add-card isButton">+</button>

      </div>
    </div>
  </header> <!-- /header -->

  <main>
    <div class="container">
      <div id="cards" class="row row-cards">

          


      </div>
    </div>
  </main> <!-- /main -->



  <div class="popup popup__signin">
    <div class="popup__block">
      <div class="popup__close">&#10006;</div>
      <form id="signin" class="popup__form" action="vendor/signin.php" method="post">
        <button class="item__btn_style" tabindex="3" type="submit">Войти</button>
        <input id="password" tabindex="2" type="password" name="password" placeholder="Введите пароль">
        <label for="password">Пароль</label>
        <input id="login" tabindex="1" type="text" name="login" placeholder="Введите логин или email">
        <label for="login">Логин</label>
      </form>
      <div class="popup__subtitle">
        <p>Еще не зарегестрировались? <a class="a__signup" href="#">Регистрация</a></p>
      </div>
    </div>
  </div>

  <div class="popup popup__signup">
    <div class="popup__block">
      <div class="popup__close">&#10006;</div>
      <form id="signup" class="popup__form" action="vendor/signup.php" method="post">
        <button class="item__btn_style" tabindex="5" type="submit">Зарегестрироваться</button>
        <input id="password_up_confirm" tabindex="4" autocomplete="new-password" type="password" name="password_confirm" placeholder="Повторите пароль">
        <input id="password_up" tabindex="3" autocomplete="new-password" type="password" name="password" placeholder="Введите пароль">
        <label for="password_up">Пароль</label>
        <input id="email_up" tabindex="2" autocomplete="off" type="email" name="email" placeholder="Введите email">
        <label for="email_up">Email</label>
        <input id="login_up" tabindex="1" autocomplete="off" type="text" name="login" placeholder="Введите логин">
        <label for="login_up">Логин</label>
      </form>
      <div class="popup__subtitle">
        <p>Уже есть аккаунт? <a class="a__signin" href="">Войти</a></p>
      </div>
    </div>
  </div>
  
  <script src="js/main.js?v=<?= $upd?>"></script>

</body>
</html>