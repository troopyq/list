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
  
  export default calcScroll;