import addDateCard from './addDateCard'
import inputChange from './inputChange'


export default class Card {
  constructor(obj) {
    this.obj = obj || {};

    this.parent = document.querySelector('.row-cards');
  }

  create() {

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
    
    if (Object.keys(card).length !== 0) {


      if (card.title) {
        block.querySelector('.title__text').textContent = card.title;
      }

      if (card.list.length > 0) {
        
        if (card.list[card.list.length - 1].text.toString().length > 0) {

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
            
            block.querySelector('.list__ol').append(liBlock);
          }
        });
      }
    }

    if (card.dateTime) {
      
      block.querySelector('.date-card__date').textContent = card.dateTime.date;
      block.querySelector('.date-card__time').textContent = card.dateTime.time;
    }

    this.parent.append(block);

    inputChange();

    return block;
  }

  render(res) {}
}

