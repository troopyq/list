<?php 
  session_start();
  $upd = 12;

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

          <?php if ($_SESSION['user']['id']){
            require_once './vendor/connect.php';
            require './vendor/getData.php';
            
            foreach ($data2 as $key => $value) {
              // if ($value['title'] !== '' && $value[0]['text'] !== ''):

          ?>

        <div class="block block_fadeIn" style="order: <?= $value['id']?>;">
          <div class="block__item item">
            <div class="item__title title">
              <h3 class="title__text item__text">
                <?php if (trim($value['title']) === ''){ ?>
                <textarea class="title__input" placeholder="Название списка" maxlength="90"></textarea>
                <?php } else{
                  echo trim($value['title']);
            }
                ?>
                
              </h3>
              <div class="item__header">
                <span class="item__close item__header-btn">&amp;#8212;</span>
                <span class="item__delete item__header-btn">✖</span>
              </div>
            </div>
            <div class="item__list list">
              <ol class="list__ol">
              <?php   foreach ($value['list'] as $key => $value) {
                 # code...
                 if ($value['complete']):
                ?>

                <li class="item__text li__text list__complete li__complete">

                  <?php if (trim($value['text']) === ''){ ?>
                <textarea class="list__input" placeholder="Название дела" maxlength="90"></textarea>
                <?php } else{
                  echo trim($value['text']);
                   }   
                ?>
                </li>

                 <?php else:  ?>

                <li class="item__text li__text list__complete">
                  <?php if (trim($value['text']) === ''){ ?>
                <textarea class="list__input" placeholder="Название дела" maxlength="90"></textarea>
                <?php } else{
                  echo trim($value['text']);
                   }   
                ?>
                </li>

                <?php
                  endif;
                
                }
                ?>
              </ol>
            </div>
            <div class="item__btn">
              <button class="item__btn_rename item__btn_style"></button>
              <button class="item__btn_delete item__btn_style"><span>--</span></button>
              <button class="item__btn_add item__btn_style"><span>+</span></button>
            </div>
          </div>
        </div>
        <?php
            // endif;
          }
        } else{
         ?>

          <div class="cards__title">
            <p>Авторизируйтесь, чтобы записи сохранились</p>
            <p>Чтобы создать новый список, нажмите на "+" сверху</p>
          </div>


        <?php }  ?>



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