// import inputChange from './inputChange.js'
// import scrollToInput from './scrollToInput.js'

class Card {
  constructor(obj) {
    this.obj = obj || {};
    console.log('получил данные');

    this.parent = document.querySelector('.row-cards');
  }

  create() {
    console.log('создаю карту');

    let block = document.createElement('div');
    block.classList.add('block');
    block.innerHTML = `
      <div class="block__item item">
        <div class="item__title title">
          <h3 class="title__text item__text">
            <textarea class="title__input" placeholder="Название списка" maxlength="90"></textarea>      
          </h3>
          <div class="item__header">
            <span class="item__delete item__header-btn">✖</span>
          </div>
        </div>
        <div class="item__list list">
          <ol class="list__ol">
            <li class="item__text li__text">
              <textarea class="list__input" placeholder="Название дела" maxlength="120"></textarea>
            </li>
          </ol>
        </div>
        <div class="item__btn">
          <div class="item__btn_date date-card">
            <span class="date-card__date"></span>
            <span class="date-card__time"></span>
          </div>
          <button class="item__btn_rename item__btn_style"></button>
          <button class="item__btn_delete item__btn_style"><span>--</span></button>
          <button class="item__btn_add item__btn_style"><span>+</span></button>
        </div>
      </div>
      `;
      addDateCard(block);
      let card = this.obj;
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
        card.list.forEach((li) => {
          let liBlock = document.createElement('li');
          liBlock.className = 'item__text li__text list__complete';
          liBlock.textContent = li.text;
          if (li.complete) {
            liBlock.classList.add('li__complete');
          }
          if (li.text.toString().length > 0){
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

  render(res) {}
}

const scrollWidth = calcScroll();

function addCard(button, where = '.row-cards') {
  const btn = document.querySelector(button);

  btn.addEventListener('click', createCard);

  function createCard() {
    create();
    inputChange();
  }

  function create() {
    let block = new Card().create();

    let count = document.querySelectorAll('.block').length;
    block.style.order = `${count}`;
    scrollToInput(block.querySelector('.title__input'), 'center');

    block.querySelector('.title__input').onblur = () => {
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
  cards.addEventListener('click', (e) => {
    let addBtn = document.querySelectorAll('.item__btn_add');
    let target = e.target;

    addBtn.forEach((btn) => {
      if (target == btn || target == btn.firstElementChild) {
        let inputs = document.querySelectorAll('.block textarea');
        inputs.forEach((item) => {
          item.removeAttribute('autofocus');
        });

        let list = btn.closest('.block').querySelector('.list__ol');
        let isFirstEmpty = false;
        isFirstEmpty = !list.firstElementChild
          ? false
          : list.firstElementChild.textContent.length > 0
          ? false
          : true;
        // console.log(isFirstEmpty)
        let li = document.createElement('li');
        let input = document.createElement('textarea');
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
  let div = document.createElement('div');
  div.style.width = '50px';
  div.style.height = '50px';
  div.style.overflowY = 'scroll';
  div.classList.add('div-test-block');

  document.body.appendChild(div);
  let scrollWidth = div.offsetWidth - div.clientWidth;
  let divs = document.querySelectorAll('.div-test-block');
  divs.forEach((item) => {
    item.remove();
  });
  div.remove();

  return scrollWidth;
}

// export default calcScroll

// import calcScroll from './calcScroll.js'
// import difference from './difference.js'
// import updateData from './updateData.js'

function closeCard(e, selector, animTime = 1, transTime = 1) {
  let scrollWindow = scrollWidth;
  let widthWindow = {};
  widthWindow.w = document.body.offsetWidth + scrollWindow;
  let mobile = widthWindow.w <= 840 ? true : false;

  window.addEventListener('resize', () => {
    widthWindow.w = document.body.offsetWidth + scrollWindow;
    mobile = widthWindow.w <= 840 ? true : false;
  });

  mobile = widthWindow.w <= 840 ? true : false;

  function getSupportedPropertyName(properties) {
    for (let i = 0; i < properties.length; i++) {
      if (typeof document.body.style[properties[i]] != 'undefined') {
        return properties[i];
      }
    }
    return null;
  }

  let transform = ['transform', 'msTransform', 'webkitTransform', 'mozTransform', 'oTransform'];

  let transformProperty = getSupportedPropertyName(transform);

  // document.querySelector('body').addEventListener('click', (e) => {

  let del = document.querySelectorAll(selector);

  del.forEach((item, id) => {
    const target = e.target;

    if (target === item) {
      let deleted = del.length - 1 == id ? true : false;
      let block = item.closest('.block');

      let h = {};
      h.tBlock = block.offsetTop;
      h.lblock = block.offsetLeft;
      h.wblock = block.offsetWidth;
      h.diff = difference(block, id, del, mobile);

      block.classList.add('closeAnim');
      block.style.animationDuration = `${animTime}s`;
      // scrollToInput(del[del.length - 3], 'center')

      if (del.length > 1) {
        if (h.lblock === 0 && id > 0) {
          if (deleted) {
            scrollToInput(del[id - 1], 'center');
            del[id].style.margin = `0 0 -10rem 0`;
          }
        } else scrollToInput(del[id], 'center');
      }

      if (!mobile) {
        for (let i = id + 1; i < del.length; i++) {
          let it = del[i].closest('.block');
          let prev = del[i - 1].closest('.block');
          let tPrev = prev.offsetTop;

          let prop = {};

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
            it.style.transition = `transform ${transTime}s ease-in-out`;
            // it.style[transformProperty] = `translate3d(${-prop.ofLeft}px,
            //                                ${h.tBlock !== tPrev ? -(prop.ofTop + h.diff) : -(prop.ofTop)}px,
            //                                 0px)`;
            it.style[transformProperty] = `translateX(${-prop.ofLeft}px) translateY(${
              h.tBlock !== tPrev ? -(prop.ofTop + h.diff) : -prop.ofTop
            }px)`;
            // it.style[transformProperty] = `translate(${-prop.ofLeft}px,
            //                                ${h.tBlock !== tPrev ? -(prop.ofTop + h.diff) : -(prop.ofTop)}px
            //                                 )`;
          }
        }
      } else {
        if (del.length > 1) {
          scrollToInput(del[id], 'end');
        }

        for (let i = del.length - 1; i > id; i--) {
          let it = del[i].closest('.block');

          if (transformProperty) {
            it.style.transition = `transform ${transTime}s ease-in-out`;
            // it.style[transformProperty] = `translate3d(0px, ${-(h.diff)}px, 0px)`
            it.style[transformProperty] = `translateY(${-h.diff}px)`;
            // it.style[transformProperty] = `translate(0px, ${-(h.diff)}px)`
          }
        }
      }

      setTimeout(() => {
        block.style.opacity = '0';
        block.style.visibility = 'hidden';

        del.forEach((item, id2) => {
          let card = item.closest('.block');
          let i2 = id2 + 1;
          let i = id + 1;

          if (i2 != i) {
            if (transformProperty) {
              card.style.zIndex = '2';
              card.style.transition = 'none';
              // card.style[transformProperty] = `translate3d(0px, 0px, 0px)`
              card.style[transformProperty] = `translateX(0px) translateY(0px)`;
              // card.style[transformProperty] = `translate(0px, 0px)`
            }
          }
        });

        block.remove();
        updateData();
      }, transTime * 1000 - 10);
    }

    setTimeout(() => {
      let card = item.closest('.block');
      card.style.order = `${id + 1}`;
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

  cards.addEventListener('click', (e) => {
    let tar = e.target;
    let block = cards.querySelectorAll('.block');
    block.forEach((b) => {
      let list = b.querySelectorAll('.li__text');
      list.forEach((li) => {
        if (tar === li) {
          let liCl = li.classList;
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

function difference(target, tId, arrBlocks, mobile = false) {
  let h = {};
  let valHeights = [];
  let heightBottom = [];

  // вычисляем данные удаляемого блока - цель
  h.hTarget = target.offsetHeight;
  h.tTarget = target.offsetTop;
  h.idTarget = tId;

  // через перебор, вычисляем разницу высоты с текущей линией
  for (let i = 0; i < arrBlocks.length; i++) {
    let item = arrBlocks[i].closest('.block');
    // если текущий блок не на строке с удаляемым, то пропускаем цикл
    if (item.offsetTop !== h.tTarget) {
      continue;
    }

    let itNext = arrBlocks[i + 1];
    // высчитываем есть ли следующий юлок
    if (itNext !== undefined) {
      let nextBottom = itNext.closest('.block');
      // добавляем высоту сьехавшего блока на текущую линию
      if (nextBottom.offsetLeft === 0) {
        h.hBottom = nextBottom.offsetHeight;
        heightBottom.push({
          height: h.hBottom,
          id: i + 1,
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
      let hCur = item.offsetHeight;

      valHeights.push({
        height: hCur,
        id: i,
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
  let max = valHeights.reduce((prev, cur) => {
    if (prev.height > cur.height) {
      return prev;
    }
    return cur;
  });

  max = max.height;
  target = h.hTarget;
  let bottom;

  bottom = heightBottom.length > 0 ? heightBottom[0].height : null;
  let diff = 0;
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
  let cards = document.querySelector('.row-cards');
  let inputs = cards.getElementsByTagName('textarea');
  let content;

  for (let item of inputs) {
    item.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.path[1].classList.remove('text__rename');
        e.path[0].blur();
        updateData();
      }
    });

    item.addEventListener('focus', (e) => {
      content = e.path[1].textContent.trim();
      scrollToInput(e.path[0], 'center');
      if (content.length > 0) {
        item.value = content;
      }
    });

    item.addEventListener('blur', (e) => {
      let li = e.path[1];
      let val = e.path[0].value.trim();

      // console.log(e.path[0].classList)
      if (val.length >= 1) {
        e.path[0].blur();
        li.textContent = val.replace(/\s+\r?\n/g, ' ').trim();
        e.path[0].remove();
        li.classList.add('list__complete');
        updateData();
      } else if (
        val.length === 0 &&
        e.path[1].classList.contains('li__text') &&
        e.path[2].querySelectorAll('li').length > 1 &&
        li.textContent.length < 1
      ) {
        li.classList.add('list_fadeOut');
        let liStyle = getComputedStyle(li);
        let time = liStyle.animationDuration;
        time = parseFloat(time);
        setTimeout(() => {
          e.path[1].remove();
        }, time * 1000 - 15);
      }
    });
  }
}

// export default inputChange

function modals() {
  const bindModals = (triggerSelector, modalSelector, closeSelector, closeClckOverlay = true) => {
    const trigger = document.querySelectorAll(triggerSelector),
      modal = document.querySelector(modalSelector),
      close = document.querySelector(closeSelector),
      windows = document.querySelectorAll('.popup');

    let scroll = scrollWidth;

    trigger.forEach((item) => {
      item.addEventListener('click', (e) => {
        if (e.target) e.preventDefault();

        windows.forEach((item) => {
          item.classList.remove('popup_visible');
        });

        scroll = calcScroll();
        // modal.style.display = 'block'
        modal.classList.add('popup_visible');
        document.body.style.overflow = 'hidden';
        document.body.style.paddingRight = `${scroll}px`;
        document.querySelector('header').style.paddingRight = `${scroll}px`;
      });
    });

    close.addEventListener('click', () => {
      windows.forEach((item) => {
        item.classList.remove('popup_visible');
      });
      modal.classList.remove('popup_visible');
      document.body.style.overflow = '';
      document.body.style.paddingRight = ``;
      document.querySelector('header').style.paddingRight = ``;
    });

    modal.addEventListener('mousedown', (e) => {
      if (e.target === modal && closeClckOverlay) {
        modal.classList.remove('popup_visible');
        document.body.style.overflow = '';
        document.body.style.paddingRight = ``;
        document.querySelector('header').style.paddingRight = ``;

        windows.forEach((item) => {
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
  let str = document.cookie;
  let regexp = /user/i;

  if (regexp.test(str)) {
    // console.log('yes')
    let btn = document.querySelector(btnSelector);
    let prof = document.querySelector(profile);
    let isStop = true;
    let count = 0;
    btn.addEventListener('click', () => {
      if (isStop) {
        count++;
        isStop = false;
        prof.classList.toggle('open__profile');

        document.body.addEventListener('click', (e) => {
          if (
            prof.classList.contains('open__profile') &&
            !e.target.closest('.profile__header') &&
            isStop
          ) {
            prof.classList.remove('open__profile');
          }
        });

        // prof.style.visibility = 'visible'
        // prof.style.animationPlayState = 'running'
        let st = getComputedStyle(prof);
        let time = parseFloat(st.transitionDuration);
        // console.log(time)
        setTimeout(() => {
          if (count % 2 === 0) {
            // prof.style.visibility = 'hidden'
            // prof.style.opacity = '0'
          }
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
  document.body.addEventListener('click', (e) => {
    let target = e.target;
    let delBtn = document.querySelectorAll('.item__btn_delete');

    delBtn.forEach((btn) => {
      let lists = btn.closest('.block').querySelectorAll('.list__ol .item__text');

      if (target !== btn && target !== btn.firstElementChild) {
        lists.forEach((item) => {
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

        lists.forEach((li, id) => {
          if (li.classList.contains('list__complete') || li.classList.contains('list__delete')) {
            // console.log(btn.classList)
            li.classList.toggle('list__complete');
            li.classList.toggle('list__delete');

            li.addEventListener('click', () => {
              if (
                li.classList.contains('list__delete') &&
                btn.classList.contains('item__btn_delete-active')
              ) {
                li.classList.add('list_fadeOut');
                let liStyle = getComputedStyle(li);
                let time = liStyle.animationDuration;
                time = parseFloat(time);

                setTimeout(() => {
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
  document.body.addEventListener('click', (e) => {
    let tar = e.target;
    let renameBtn = cards.querySelectorAll('.item__btn_rename');

    renameBtn.forEach((item) => {
      let block = item.closest('.block');
      let text = block.querySelectorAll('.item__text');
      text.forEach((ren) => {
        if (tar !== item && tar !== ren && tar !== ren.parentElement) {
          item.classList.remove('item__btn_rename-active');
          ren.classList.remove('text__rename');
        }
      });

      if (tar === item) {
        item.classList.toggle('item__btn_rename-active');

        // text.forEach(target => {
        for (let i = 0; i < text.length; i++) {
          let target = text[i];

          if (item.classList.contains('item__btn_rename-active')) {
            target.classList.add('text__rename');
          } else {
            target.classList.remove('text__rename');
            continue;
          }

          let click = false;

          target.addEventListener('click', rename);
          if (click) {
            target.removeEventListener('click', rename);
          }

          function rename() {
            let input = document.createElement('textarea');

            if (item.classList.contains('item__btn_rename-active') && !click) {
              click = true;
              if (target.classList.contains('title__text')) {
                // console.log(target)
                input.classList.add('title__input');
                input.setAttribute('placeholder', 'Название списка');
                input.setAttribute('maxlength', '60');
              } /* else if (target.classList.contains('li__text') || target.classList.contains('list__input')) { */ else {
                input.classList.add('list__input');
                input.setAttribute('placeholder', 'Название дела');
                input.setAttribute('maxlength', '90');
              }

              let content = target.textContent.replace(/\s+\r?\n/g, ' ').trim();
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
        }
      }
    });
  });
}

// export default renameList

function scrollToInput(item, where = 'start', inline = 'nearest') {
  item.scrollIntoView({
    behavior: 'smooth',
    block: where,
    inline: inline,
  });
}

// export default scrollToInput

function updateData() {
  const cards = document.querySelector('#cards');
  const currentCards = cards.querySelectorAll('.block');

  if (currentCards.length >= 0) {
    const message = {
      loading: 'Загрузка...',
      success: 'Данные успешно отправлены!',
      failure: 'Произошла ошибка...',
    };

    const postData = async (url, data) => {
      let res = await fetch(url, {
        method: 'POST',
        headers: {
          Accept: 'application/json, text/plain, */*',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      // console.log(JSON.stringify(data))

      return await res.json();
    };

    let dataForm = [];
    currentCards.forEach((card, id) => {
      let title = card
        .querySelector('.title__text')
        .textContent.replace(/\s+\r?\n/g, ' ')
        .trim();
      let list = card.querySelectorAll('.li__text');
      let date = card.querySelector('.date-card__date').textContent;
      let time = card.querySelector('.date-card__time').textContent;

      let listValue = [];

      let isLi = false;
      list.forEach((li) => {
        listValue.push({
          text: li.textContent.replace(/\s+\r?\n/g, ' ').trim(),
          complete: li.classList.contains('li__complete') || false,
        });
        if (li.textContent.replace(/\s+\r?\n/g, ' ').trim().length > 0) {
          isLi = true;
        }
      });

      let info = {
        id: id,
        dateTime: {
          date,
          time,
        },
        title: title,
        list: listValue,
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
    const formData = dataForm;
    console.log(formData);
    // for (let key of dataForm) {
    //   formData.append(key, dataForm[key])
    // }

    postData('./vendor/updateData.php', formData)
      .then((res) => {})
      .catch(() => {})
      .finally(() => {});
  }
}

// export default updateData

function validation() {
  let formSignin = document.querySelector('#signin');
  let formSignup = document.querySelector('#signup');
  let popup = document.querySelectorAll('.popup');
  let popupSignin = formSignin.closest('.popup__signin');

  const message = {
    loading: 'Загрузка...',
    success: 'Данные успешно отправлены!',
    failure: 'Произошла ошибка...',
  };

  function isEmpty(form) {
    let inputs = form.querySelectorAll('input');
    let res = false;
    inputs.forEach((item) => {
      if (item.value !== '') {
      } else {
        res = true;
      }
    });

    return res;
  }

  const postData = async (url, data) => {
    let res = await fetch(url, {
      method: 'POST',
      // headers: {
      //   'Content-Type': 'application/json',  // отправляемые данные
      // },
      body: data,
    });

    return await res.json();
  };

  post(formSignin);
  post(formSignup, true);

  function post(item, isSign = false) {
    item.addEventListener('submit', (e) => {
      e.preventDefault();

      const status = document.createElement('div');
      status.classList.add('popup__status');

      if (item.closest('.popup__block').querySelector('.popup__status') !== null) {
        item.closest('.popup__block').querySelector('.popup__status').remove();
      }

      if (isEmpty(item)) {
        item.closest('.popup__block').appendChild(status);
        status.textContent = 'Введите данные';
        setInterval(() => status.remove(), 3000);
        return false;
      }

      let dataForm = {};
      let inputs = item.querySelectorAll('input');
      inputs.forEach((input) => {
        let name = input.getAttribute('name');
        let val = input.value;
        dataForm[name] = val;
      });

      const formData = new FormData();

      for (let key in dataForm) {
        formData.append(key, dataForm[key]);
      }

      if (isSign) {
        postData('vendor/signup.php', formData)
          .then((res) => {
            console.log(res);
            if (res.status) {
              item.closest('.popup__block').appendChild(status);
              status.textContent = res.message;
              setTimeout(() => {
                popup.forEach((item) => item.classList.remove('popup_visible'));
                popupSignin.classList.add('popup_visible');
              }, 1000);
            } else {
              item.closest('.popup__block').appendChild(status);
              status.textContent = res.message;
            }
            // status.textContent = message.success
          })
          .catch(() => {
            item.appendChild(status);
            status.textContent = message.failure;
          })
          .finally(() => {
            setInterval(() => status.remove(), 5000);
          });
      } else {
        postData('vendor/signin.php', formData)
          .then((res) => {
            console.log(res);
            if (res.status) {
              popup.forEach((item) => (item.style.display = 'none'));
              item.closest('.popup__block').appendChild(status);
              status.textContent = res.message;
              location.reload();
            } else {
              item.closest('.popup__block').appendChild(status);
              status.textContent = res.message;
            }
            // status.textContent = message.success
          })
          .catch(() => {
            status.textContent = message.failure;
          })
          .finally(() => {
            setInterval(() => status.remove(), 3000);
          });
      }
    });
  }
}

// export default validation

function renderCardsForData() {
  const postData = async (url, data) => {
    let res = await fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    // console.log(JSON.stringify(data))

    return await res.json();
  };
  let formData = {};
  postData('./vendor/getData.php', formData)
    .then((res) => {
      console.log('prinal');
      console.log(res);
      res.forEach((item) => {
        console.log('начало рендера');

        renderCard(item);
        // new Card().create(item);
        // console.log(new Card().create());
      });
    })
    .catch(() => {})
    .finally(() => {});
}

function renderCard(item) {
  console.log('передаю данные в рендер');

  new Card(item).create();
}

function addZero(num) {
  return num >= 10 ? num : `0${num}`;
}

function addDateCard(parent) {
  const divDateCard = parent.querySelector('.date-card'),
    divDate = divDateCard.querySelector('.date-card__date'),
    divTime = divDateCard.querySelector('.date-card__time');
  const dt = new Date();
  const date = {
    year: dt.getFullYear(),
    month: addZero(dt.getMonth()),
    day: addZero(dt.getDate()),
    time: dt.getTime(),
    hours: addZero(dt.getHours()),
    minutes: addZero(dt.getMinutes()),
  };

  date.time = `${date.hours}:${date.minutes}`;
  date.date = `${date.day}.${date.month}.${date.year}`;

  divDate.textContent = date.date;
  divTime.textContent = date.time;
}

document.addEventListener('DOMContentLoaded', () => {
  document.body.addEventListener('click', (e) => {
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

  let updateDataInterval = setInterval(() => {
    updateData();
  }, 1000 * 30 * 1);
});
