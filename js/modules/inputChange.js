import completeList from './completeList'
import updateData from './updateData'
import scrollToInput from './scrollToInput'

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

export default inputChange