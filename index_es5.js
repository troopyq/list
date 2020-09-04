'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// import inputChange from './inputChange.js'
// import scrollToInput from './scrollToInput.js'

var Card = function () {
  function Card(obj) {
    _classCallCheck(this, Card);

    this.obj = obj || {};
    console.log('получил данные');

    this.parent = document.querySelector('.row-cards');
  }

  _createClass(Card, [{
    key: 'create',
    value: function create() {
      console.log('создаю карту');

      var block = document.createElement('div');
      block.classList.add('block');
      block.innerHTML = '\n      <div class="block__item item">\n        <div class="item__title title">\n          <h3 class="title__text item__text">\n            <textarea class="title__input" placeholder="\u041D\u0430\u0437\u0432\u0430\u043D\u0438\u0435 \u0441\u043F\u0438\u0441\u043A\u0430" maxlength="90"></textarea>      \n          </h3>\n          <div class="item__header">\n            <span class="item__delete item__header-btn">\u2716</span>\n          </div>\n        </div>\n        <div class="item__list list">\n          <ol class="list__ol">\n            <li class="item__text li__text">\n              <textarea class="list__input" placeholder="\u041D\u0430\u0437\u0432\u0430\u043D\u0438\u0435 \u0434\u0435\u043B\u0430" maxlength="120"></textarea>\n            </li>\n          </ol>\n        </div>\n        <div class="item__btn">\n          <div class="item__btn_date date-card">\n            <span class="date-card__date"></span>\n            <span class="date-card__time"></span>\n          </div>\n          <button class="item__btn_rename item__btn_style"></button>\n          <button class="item__btn_delete item__btn_style"><span>--</span></button>\n          <button class="item__btn_add item__btn_style"><span>+</span></button>\n        </div>\n      </div>\n      ';
      addDateCard(block);
      var card = this.obj;
      console.log(card);

      if (Object.keys(card).length !== 0) {
        console.log('беру данные из карты');

        console.log(card);

        if (card.title) {
          block.querySelector('.title__text').textContent = card.title;
        }

        if (card.list.length > 0) {
          console.log();

          if (card.list[card.list.length - 1].text.toString().length > 0) {
            console.log('почистил');

            block.querySelector('.list__ol').innerHTML = '';
          }
          card.list.forEach(function (li) {
            var liBlock = document.createElement('li');
            liBlock.className = 'item__text li__text list__complete';
            liBlock.textContent = li.text;
            if (li.complete) {
              liBlock.classList.add('li__complete');
            }
            if (li.text.toString().length > 0) {
              console.log('добавлен');

              block.querySelector('.list__ol').append(liBlock);
            }
          });
        }
      }

      if (card.dateTime) {
        console.log(card.dateTime.time);

        block.querySelector('.date-card__date').textContent = card.dateTime.date;
        block.querySelector('.date-card__time').textContent = card.dateTime.time;
      }

      this.parent.append(block);

      inputChange();

      return block;
    }
  }, {
    key: 'render',
    value: function render(res) {}
  }]);

  return Card;
}();

var scrollWidth = calcScroll();

function addCard(button) {
  var where = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '.row-cards';

  var btn = document.querySelector(button);

  btn.addEventListener('click', createCard);

  function createCard() {
    create();
    inputChange();
  }

  function create() {
    var block = new Card().create();

    var count = document.querySelectorAll('.block').length;
    block.style.order = '' + count;
    scrollToInput(block.querySelector('.title__input'), 'center');

    block.querySelector('.title__input').onblur = function () {
      // scrollToInput(list__input)
      // list__input.focus()
    };

    block.classList.add('block_fadeIn');

    return '';
  }
}

// export default addCard

// import inputChange from './inputChange.js'
// import updateData from './updateData.js';

function addList() {
  cards.addEventListener('click', function (e) {
    var addBtn = document.querySelectorAll('.item__btn_add');
    var target = e.target;

    addBtn.forEach(function (btn) {
      if (target == btn || target == btn.firstElementChild) {
        var inputs = document.querySelectorAll('.block textarea');
        inputs.forEach(function (item) {
          item.removeAttribute('autofocus');
        });

        var list = btn.closest('.block').querySelector('.list__ol');
        var isFirstEmpty = false;
        isFirstEmpty = !list.firstElementChild ? false : list.firstElementChild.textContent.length > 0 ? false : true;
        // console.log(isFirstEmpty)
        var li = document.createElement('li');
        var input = document.createElement('textarea');
        input.className = 'list__input';
        li.className = 'item__text li__text list_fadeIn';
        input.setAttribute('placeholder', 'Название дела');
        input.setAttribute('autofocus', true);

        if (!isFirstEmpty) {
          list.append(li);
          li.append(input);
          input.focus();
          inputChange();
          updateData();
        } else if (list.firstElementChild) {
          list.firstElementChild.firstElementChild.focus();
        }
      }
    }); // forEach addBtn
  }); //body LISTENER
}

// export default addList

function calcScroll() {
  var div = document.createElement('div');
  div.style.width = '50px';
  div.style.height = '50px';
  div.style.overflowY = 'scroll';
  div.classList.add('div-test-block');

  document.body.appendChild(div);
  var scrollWidth = div.offsetWidth - div.clientWidth;
  var divs = document.querySelectorAll('.div-test-block');
  divs.forEach(function (item) {
    item.remove();
  });
  div.remove();

  return scrollWidth;
}

// export default calcScroll

// import calcScroll from './calcScroll.js'
// import difference from './difference.js'
// import updateData from './updateData.js'

function closeCard(e, selector) {
  var animTime = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;
  var transTime = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 1;

  var scrollWindow = scrollWidth;
  var widthWindow = {};
  widthWindow.w = document.body.offsetWidth + scrollWindow;
  var mobile = widthWindow.w <= 840 ? true : false;

  window.addEventListener('resize', function () {
    widthWindow.w = document.body.offsetWidth + scrollWindow;
    mobile = widthWindow.w <= 840 ? true : false;
  });

  mobile = widthWindow.w <= 840 ? true : false;

  function getSupportedPropertyName(properties) {
    for (var i = 0; i < properties.length; i++) {
      if (typeof document.body.style[properties[i]] != 'undefined') {
        return properties[i];
      }
    }
    return null;
  }

  var transform = ['transform', 'msTransform', 'webkitTransform', 'mozTransform', 'oTransform'];

  var transformProperty = getSupportedPropertyName(transform);

  // document.querySelector('body').addEventListener('click', (e) => {

  var del = document.querySelectorAll(selector);

  del.forEach(function (item, id) {
    var target = e.target;

    if (target === item) {
      var deleted = del.length - 1 == id ? true : false;
      var block = item.closest('.block');

      var h = {};
      h.tBlock = block.offsetTop;
      h.lblock = block.offsetLeft;
      h.wblock = block.offsetWidth;
      h.diff = difference(block, id, del, mobile);

      block.classList.add('closeAnim');
      block.style.animationDuration = animTime + 's';
      // scrollToInput(del[del.length - 3], 'center')

      if (del.length > 1) {
        if (h.lblock === 0 && id > 0) {
          if (deleted) {
            scrollToInput(del[id - 1], 'center');
            del[id].style.margin = '0 0 -10rem 0';
          }
        } else scrollToInput(del[id], 'center');
      }

      if (!mobile) {
        for (var i = id + 1; i < del.length; i++) {
          var it = del[i].closest('.block');
          var prev = del[i - 1].closest('.block');
          var tPrev = prev.offsetTop;

          var prop = {};

          prop.prevTop = prev.offsetTop;
          prop.prevLeft = prev.offsetLeft;
          prop.itTop = it.offsetTop;
          prop.itLeft = it.offsetLeft;

          prop.ofLeft = prop.itLeft - prop.prevLeft;

          if (prop.itTop !== prop.prevTop) {
            prop.ofTop = prop.itTop - prop.prevTop;
          } else {
            prop.ofTop = 0;
          }

          if (transformProperty) {
            it.style.transition = 'transform ' + transTime + 's ease-in-out';
            // it.style[transformProperty] = `translate3d(${-prop.ofLeft}px,
            //                                ${h.tBlock !== tPrev ? -(prop.ofTop + h.diff) : -(prop.ofTop)}px,
            //                                 0px)`;
            it.style[transformProperty] = 'translateX(' + -prop.ofLeft + 'px) translateY(' + (h.tBlock !== tPrev ? -(prop.ofTop + h.diff) : -prop.ofTop) + 'px)';
            // it.style[transformProperty] = `translate(${-prop.ofLeft}px,
            //                                ${h.tBlock !== tPrev ? -(prop.ofTop + h.diff) : -(prop.ofTop)}px
            //                                 )`;
          }
        }
      } else {
        if (del.length > 1) {
          scrollToInput(del[id], 'end');
        }

        for (var _i = del.length - 1; _i > id; _i--) {
          var _it = del[_i].closest('.block');

          if (transformProperty) {
            _it.style.transition = 'transform ' + transTime + 's ease-in-out';
            // it.style[transformProperty] = `translate3d(0px, ${-(h.diff)}px, 0px)`
            _it.style[transformProperty] = 'translateY(' + -h.diff + 'px)';
            // it.style[transformProperty] = `translate(0px, ${-(h.diff)}px)`
          }
        }
      }

      setTimeout(function () {
        block.style.opacity = '0';
        block.style.visibility = 'hidden';

        del.forEach(function (item, id2) {
          var card = item.closest('.block');
          var i2 = id2 + 1;
          var i = id + 1;

          if (i2 != i) {
            if (transformProperty) {
              card.style.zIndex = '2';
              card.style.transition = 'none';
              // card.style[transformProperty] = `translate3d(0px, 0px, 0px)`
              card.style[transformProperty] = 'translateX(0px) translateY(0px)';
              // card.style[transformProperty] = `translate(0px, 0px)`
            }
          }
        });

        block.remove();
        updateData();
      }, transTime * 1000 - 10);
    }

    setTimeout(function () {
      var card = item.closest('.block');
      card.style.order = '' + (id + 1);
    }, transTime * 1000 - 10);
  });

  // })
}

// export default closeCard

// import updateData from './updateData.js'

function completeList() {
  // let list = document.getElementsByClassName('list__complete')

  // for (let li of list){

  //   li.addEventListener('click', () => {
  //     if (li.classList.contains('list__complete') && !li.classList.contains('text__rename')){
  //       li.classList.toggle('li__complete')
  //     }
  //   })

  // }

  cards.addEventListener('click', function (e) {
    var tar = e.target;
    var block = cards.querySelectorAll('.block');
    block.forEach(function (b) {
      var list = b.querySelectorAll('.li__text');
      list.forEach(function (li) {
        if (tar === li) {
          var liCl = li.classList;
          if (liCl.contains('list__complete') && !liCl.contains('text__rename')) {
            liCl.toggle('li__complete');
            updateData();
          }
        }
      });
    });
  });
}

// export default completeList

function difference(target, tId, arrBlocks) {
  var mobile = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;

  var h = {};
  var valHeights = [];
  var heightBottom = [];

  // вычисляем данные удаляемого блока - цель
  h.hTarget = target.offsetHeight;
  h.tTarget = target.offsetTop;
  h.idTarget = tId;

  // через перебор, вычисляем разницу высоты с текущей линией
  for (var i = 0; i < arrBlocks.length; i++) {
    var item = arrBlocks[i].closest('.block');
    // если текущий блок не на строке с удаляемым, то пропускаем цикл
    if (item.offsetTop !== h.tTarget) {
      continue;
    }

    var itNext = arrBlocks[i + 1];
    // высчитываем есть ли следующий юлок
    if (itNext !== undefined) {
      var nextBottom = itNext.closest('.block');
      // добавляем высоту сьехавшего блока на текущую линию
      if (nextBottom.offsetLeft === 0) {
        h.hBottom = nextBottom.offsetHeight;
        heightBottom.push({
          height: h.hBottom,
          id: i + 1
        });
        // вернем для мобилок разницу высоты
        if (h.hTarget === h.hBottom && mobile) {
          h.mobileDiff = h.hTarget;
          return h.mobileDiff;
        }
      }
    }
    // если текущий блок - не цель, то добалвяем высоту его в массив
    if (h.idTarget !== i) {
      var hCur = item.offsetHeight;

      valHeights.push({
        height: hCur,
        id: i
      });
    }
  } // цикл закончен

  // если в массиве высот пусто, проверяем мобильную версию, и возвращаем разницу по условию
  if (valHeights.length === 0) {
    if (mobile) {
      // console.log('val 0, targetH - ' + h.hTarget)
      return h.hTarget;
    }
    return 0;
  }
  // высчитываем максимальную высоту
  var max = valHeights.reduce(function (prev, cur) {
    if (prev.height > cur.height) {
      return prev;
    }
    return cur;
  });

  max = max.height;
  target = h.hTarget;
  var bottom = void 0;

  bottom = heightBottom.length > 0 ? heightBottom[0].height : null;
  var diff = 0;
  // проверяем цель большее ли максимальной из этой строки
  if (target > max || target < max) {
    diff = target - max;
  }
  // проверяем цель большее ли следущего нижнего блока
  if (target > bottom || target < bottom) {
    diff = target - bottom;
  }

  if (target < max && max < bottom) {
    diff = max - bottom;
  }

  if (target > max && max > bottom) {
    diff = target - max;
  }

  if (target === max && max > bottom) {
    diff = 0;
  }

  if (target < max && max > bottom) {
    diff = 0;
  }

  return diff;
}

// export default difference

// import completeList from './completeList.js'
// import updateData from './updateData.js'

function inputChange() {
  var cards = document.querySelector('.row-cards');
  var inputs = cards.getElementsByTagName('textarea');
  var content = void 0;

  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    var _loop = function _loop() {
      var item = _step.value;

      item.addEventListener('keydown', function (e) {
        if (e.key === 'Enter') {
          e.path[1].classList.remove('text__rename');
          e.path[0].blur();
          updateData();
        }
      });

      item.addEventListener('focus', function (e) {
        content = e.path[1].textContent.trim();
        scrollToInput(e.path[0], 'center');
        if (content.length > 0) {
          item.value = content;
        }
      });

      item.addEventListener('blur', function (e) {
        var li = e.path[1];
        var val = e.path[0].value.trim();

        // console.log(e.path[0].classList)
        if (val.length >= 1) {
          e.path[0].blur();
          li.textContent = val.replace(/\s+\r?\n/g, ' ').trim();
          e.path[0].remove();
          li.classList.add('list__complete');
          updateData();
        } else if (val.length === 0 && e.path[1].classList.contains('li__text') && e.path[2].querySelectorAll('li').length > 1 && li.textContent.length < 1) {
          li.classList.add('list_fadeOut');
          var liStyle = getComputedStyle(li);
          var time = liStyle.animationDuration;
          time = parseFloat(time);
          setTimeout(function () {
            e.path[1].remove();
          }, time * 1000 - 15);
        }
      });
    };

    for (var _iterator = inputs[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      _loop();
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }
}

// export default inputChange

function modals() {
  var bindModals = function bindModals(triggerSelector, modalSelector, closeSelector) {
    var closeClckOverlay = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;

    var trigger = document.querySelectorAll(triggerSelector),
        modal = document.querySelector(modalSelector),
        close = document.querySelector(closeSelector),
        windows = document.querySelectorAll('.popup');

    var scroll = scrollWidth;

    trigger.forEach(function (item) {
      item.addEventListener('click', function (e) {
        if (e.target) e.preventDefault();

        windows.forEach(function (item) {
          item.classList.remove('popup_visible');
        });

        scroll = calcScroll();
        // modal.style.display = 'block'
        modal.classList.add('popup_visible');
        document.body.style.overflow = 'hidden';
        document.body.style.paddingRight = scroll + 'px';
        document.querySelector('header').style.paddingRight = scroll + 'px';
      });
    });

    close.addEventListener('click', function () {
      windows.forEach(function (item) {
        item.classList.remove('popup_visible');
      });
      modal.classList.remove('popup_visible');
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
      document.querySelector('header').style.paddingRight = '';
    });

    modal.addEventListener('mousedown', function (e) {
      if (e.target === modal && closeClckOverlay) {
        modal.classList.remove('popup_visible');
        document.body.style.overflow = '';
        document.body.style.paddingRight = '';
        document.querySelector('header').style.paddingRight = '';

        windows.forEach(function (item) {
          item.classList.remove('popup_visible');
        });
      }
    });
  };

  bindModals('.login', '.popup__signin', '.popup__signin .popup__close');
  bindModals('.a__signup', '.popup__signup', '.popup__signup .popup__close');
  bindModals('.a__signin', '.popup__signin', '.popup__signin .popup__close');
}
// export default modals

function openProfile(btnSelector, profile) {
  var str = document.cookie;
  var regexp = /user/i;

  if (regexp.test(str)) {
    // console.log('yes')
    var btn = document.querySelector(btnSelector);
    var prof = document.querySelector(profile);
    var isStop = true;
    var count = 0;
    btn.addEventListener('click', function () {
      if (isStop) {
        count++;
        isStop = false;
        prof.classList.toggle('open__profile');

        document.body.addEventListener('click', function (e) {
          if (prof.classList.contains('open__profile') && !e.target.closest('.profile__header') && isStop) {
            prof.classList.remove('open__profile');
          }
        });

        // prof.style.visibility = 'visible'
        // prof.style.animationPlayState = 'running'
        var st = getComputedStyle(prof);
        var time = parseFloat(st.transitionDuration);
        // console.log(time)
        setTimeout(function () {
          if (count % 2 === 0) {}
          // prof.style.visibility = 'hidden'
          // prof.style.opacity = '0'

          // prof.style.opacity = '1'
          isStop = true;
          // prof.style.animationPlayState = 'paused'
        }, time * 1000);
      }
    });
  } else {
    // console.log('no')
  }
}

// export default openProfile

// import updateData from './updateData.js';

function removeList() {
  document.body.addEventListener('click', function (e) {
    var target = e.target;
    var delBtn = document.querySelectorAll('.item__btn_delete');

    delBtn.forEach(function (btn) {
      var lists = btn.closest('.block').querySelectorAll('.list__ol .item__text');

      if (target !== btn && target !== btn.firstElementChild) {
        lists.forEach(function (item) {
          if (target !== item || target !== item.parentElement) {
            btn.classList.remove('item__btn_delete-active');
            item.classList.remove('list__delete');
            item.classList.add('list__complete');
          }
        });
      }
      if (target === btn || target === btn.firstElementChild) {
        btn.classList.toggle('item__btn_delete-active');

        lists = btn.closest('.block').querySelectorAll('.item__text');
        // let count = lists.length
        // if (count < 1){
        //   btn.classList.remove('item__btn_delete-active')
        // }

        lists.forEach(function (li, id) {
          if (li.classList.contains('list__complete') || li.classList.contains('list__delete')) {
            // console.log(btn.classList)
            li.classList.toggle('list__complete');
            li.classList.toggle('list__delete');

            li.addEventListener('click', function () {
              if (li.classList.contains('list__delete') && btn.classList.contains('item__btn_delete-active')) {
                li.classList.add('list_fadeOut');
                var liStyle = getComputedStyle(li);
                var time = liStyle.animationDuration;
                time = parseFloat(time);

                setTimeout(function () {
                  li.remove();
                  updateData();
                  lists.length === 0 ? btn.classList.remove('item__btn_delete-active') : '';
                  // count--
                }, time * 1000 - 15);
              }
            });
          }
        });
      }
    });
  });
}

// export default removeList

// import inputChange from "./inputChange.js"
// // import completeList from './completeList.js'

function renameList() {
  document.body.addEventListener('click', function (e) {
    var tar = e.target;
    var renameBtn = cards.querySelectorAll('.item__btn_rename');

    renameBtn.forEach(function (item) {
      var block = item.closest('.block');
      var text = block.querySelectorAll('.item__text');
      text.forEach(function (ren) {
        if (tar !== item && tar !== ren && tar !== ren.parentElement) {
          item.classList.remove('item__btn_rename-active');
          ren.classList.remove('text__rename');
        }
      });

      if (tar === item) {
        item.classList.toggle('item__btn_rename-active');

        // text.forEach(target => {

        var _loop2 = function _loop2(i) {
          var target = text[i];

          if (item.classList.contains('item__btn_rename-active')) {
            target.classList.add('text__rename');
          } else {
            target.classList.remove('text__rename');
            return 'continue';
          }

          var click = false;

          target.addEventListener('click', rename);
          if (click) {
            target.removeEventListener('click', rename);
          }

          function rename() {
            var input = document.createElement('textarea');

            if (item.classList.contains('item__btn_rename-active') && !click) {
              click = true;
              if (target.classList.contains('title__text')) {
                // console.log(target)
                input.classList.add('title__input');
                input.setAttribute('placeholder', 'Название списка');
                input.setAttribute('maxlength', '60');
              } /* else if (target.classList.contains('li__text') || target.classList.contains('list__input')) { */else {
                  input.classList.add('list__input');
                  input.setAttribute('placeholder', 'Название дела');
                  input.setAttribute('maxlength', '90');
                }

              var content = target.textContent.replace(/\s+\r?\n/g, ' ').trim();
              // console.log(content)
              target.innerHTML = '';

              target.append(input);
              input.focus();
              // input.value = (content.replace(/\r?\n/g, "")).trim()
              input.value = content;

              inputChange();
            }
          }

          // })
        };

        for (var i = 0; i < text.length; i++) {
          var _ret2 = _loop2(i);

          if (_ret2 === 'continue') continue;
        }
      }
    });
  });
}

// export default renameList

function scrollToInput(item) {
  var where = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'start';
  var inline = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'nearest';

  item.scrollIntoView({
    behavior: 'smooth',
    block: where,
    inline: inline
  });
}

// export default scrollToInput

function updateData() {
  var cards = document.querySelector('#cards');
  var currentCards = cards.querySelectorAll('.block');

  if (currentCards.length >= 0) {
    var message = {
      loading: 'Загрузка...',
      success: 'Данные успешно отправлены!',
      failure: 'Произошла ошибка...'
    };

    var postData = async function postData(url, data) {
      var res = await fetch(url, {
        method: 'POST',
        headers: {
          Accept: 'application/json, text/plain, */*',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });

      // console.log(JSON.stringify(data))

      return await res.json();
    };

    var dataForm = [];
    currentCards.forEach(function (card, id) {
      var title = card.querySelector('.title__text').textContent.replace(/\s+\r?\n/g, ' ').trim();
      var list = card.querySelectorAll('.li__text');
      var date = card.querySelector('.date-card__date').textContent;
      var time = card.querySelector('.date-card__time').textContent;

      var listValue = [];

      var isLi = false;
      list.forEach(function (li) {
        listValue.push({
          text: li.textContent.replace(/\s+\r?\n/g, ' ').trim(),
          complete: li.classList.contains('li__complete') || false
        });
        if (li.textContent.replace(/\s+\r?\n/g, ' ').trim().length > 0) {
          isLi = true;
        }
      });

      var info = {
        id: id,
        dateTime: {
          date: date,
          time: time
        },
        title: title,
        list: listValue
      };
      // console.log(title.length)
      // console.log(isLi)

      if (title.length > 0 || isLi) {
        dataForm.push(info);
      } else {
        // console.log('dont push')
      }
    });

    // console.log(dataForm[0])

    //  const formData = new FormData()
    var formData = dataForm;
    console.log(formData);
    // for (let key of dataForm) {
    //   formData.append(key, dataForm[key])
    // }

    postData('./vendor/updateData.php', formData).then(function (res) {}).catch(function () {}).finally(function () {});
  }
}

// export default updateData

function validation() {
  var formSignin = document.querySelector('#signin');
  var formSignup = document.querySelector('#signup');
  var popup = document.querySelectorAll('.popup');
  var popupSignin = formSignin.closest('.popup__signin');

  var message = {
    loading: 'Загрузка...',
    success: 'Данные успешно отправлены!',
    failure: 'Произошла ошибка...'
  };

  function isEmpty(form) {
    var inputs = form.querySelectorAll('input');
    var res = false;
    inputs.forEach(function (item) {
      if (item.value !== '') {} else {
        res = true;
      }
    });

    return res;
  }

  var postData = async function postData(url, data) {
    var res = await fetch(url, {
      method: 'POST',
      // headers: {
      //   'Content-Type': 'application/json',  // отправляемые данные
      // },
      body: data
    });

    return await res.json();
  };

  post(formSignin);
  post(formSignup, true);

  function post(item) {
    var isSign = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

    item.addEventListener('submit', function (e) {
      e.preventDefault();

      var status = document.createElement('div');
      status.classList.add('popup__status');

      if (item.closest('.popup__block').querySelector('.popup__status') !== null) {
        item.closest('.popup__block').querySelector('.popup__status').remove();
      }

      if (isEmpty(item)) {
        item.closest('.popup__block').appendChild(status);
        status.textContent = 'Введите данные';
        setInterval(function () {
          return status.remove();
        }, 3000);
        return false;
      }

      var dataForm = {};
      var inputs = item.querySelectorAll('input');
      inputs.forEach(function (input) {
        var name = input.getAttribute('name');
        var val = input.value;
        dataForm[name] = val;
      });

      var formData = new FormData();

      for (var key in dataForm) {
        formData.append(key, dataForm[key]);
      }

      if (isSign) {
        postData('vendor/signup.php', formData).then(function (res) {
          console.log(res);
          if (res.status) {
            item.closest('.popup__block').appendChild(status);
            status.textContent = res.message;
            setTimeout(function () {
              popup.forEach(function (item) {
                return item.classList.remove('popup_visible');
              });
              popupSignin.classList.add('popup_visible');
            }, 1000);
          } else {
            item.closest('.popup__block').appendChild(status);
            status.textContent = res.message;
          }
          // status.textContent = message.success
        }).catch(function () {
          item.appendChild(status);
          status.textContent = message.failure;
        }).finally(function () {
          setInterval(function () {
            return status.remove();
          }, 5000);
        });
      } else {
        postData('vendor/signin.php', formData).then(function (res) {
          console.log(res);
          if (res.status) {
            popup.forEach(function (item) {
              return item.style.display = 'none';
            });
            item.closest('.popup__block').appendChild(status);
            status.textContent = res.message;
            location.reload();
          } else {
            item.closest('.popup__block').appendChild(status);
            status.textContent = res.message;
          }
          // status.textContent = message.success
        }).catch(function () {
          status.textContent = message.failure;
        }).finally(function () {
          setInterval(function () {
            return status.remove();
          }, 3000);
        });
      }
    });
  }
}

// export default validation

function renderCardsForData() {
  var postData = async function postData(url, data) {
    var res = await fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });

    // console.log(JSON.stringify(data))

    return await res.json();
  };
  var formData = {};
  postData('./vendor/getData.php', formData).then(function (res) {
    console.log('prinal');
    console.log(res);
    res.forEach(function (item) {
      console.log('начало рендера');

      renderCard(item);
      // new Card().create(item);
      // console.log(new Card().create());
    });
  }).catch(function () {}).finally(function () {});
}

function renderCard(item) {
  console.log('передаю данные в рендер');

  new Card(item).create();
}

function addZero(num) {
  return num >= 10 ? num : '0' + num;
}

function addDateCard(parent) {
  var divDateCard = parent.querySelector('.date-card'),
      divDate = divDateCard.querySelector('.date-card__date'),
      divTime = divDateCard.querySelector('.date-card__time');
  var dt = new Date();
  var date = {
    year: dt.getFullYear(),
    month: addZero(dt.getMonth()),
    day: addZero(dt.getDate()),
    time: dt.getTime(),
    hours: addZero(dt.getHours()),
    minutes: addZero(dt.getMinutes())
  };

  date.time = date.hours + ':' + date.minutes;
  date.date = date.day + '.' + date.month + '.' + date.year;

  divDate.textContent = date.date;
  divTime.textContent = date.time;
}

document.addEventListener('DOMContentLoaded', function () {
  document.body.addEventListener('click', function (e) {
    closeCard(e, '.item__delete', 0.5, 0.75);
  });

  addCard('.btn__add-card');

  inputChange();

  addList();

  removeList();

  renameList();

  completeList();

  validation();

  modals();

  openProfile('.profile-btn .header__btn-log', '.profile__header');

  renderCardsForData();

  var updateDataInterval = setInterval(function () {
    updateData();
  }, 1000 * 30 * 1);
});
