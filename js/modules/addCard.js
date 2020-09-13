import inputChange from './inputChange'
import scrollToInput from './scrollToInput'
import Card from './Card'



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

export default addCard