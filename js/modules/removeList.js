// import updateData from './updateData.js';

function removeList ()  {

  document.body.addEventListener('click', e => {
    let target = e.target
    let delBtn = document.querySelectorAll('.item__btn_delete')

    delBtn.forEach(btn => {
      let lists = btn.closest('.block').querySelectorAll('.list__ol .item__text')

      if (target !== btn && target !== btn.firstElementChild){
        lists.forEach(item => {
          
          if (target !== item || target !== item.parentElement){
            btn.classList.remove('item__btn_delete-active')
            item.classList.remove('list__delete')
            item.classList.add('list__complete')

          }
        })
      } 
      if (target === btn || target === btn.firstElementChild){

        btn.classList.toggle('item__btn_delete-active')

        lists = btn.closest('.block').querySelectorAll('.item__text')
        // let count = lists.length
        // if (count < 1){
        //   btn.classList.remove('item__btn_delete-active')
        // }

        

        lists.forEach((li, id) => {
          

          if (li.classList.contains('list__complete') || li.classList.contains('list__delete')){
            // console.log(btn.classList)
            li.classList.toggle('list__complete')
            li.classList.toggle('list__delete')

            li.addEventListener('click', () => {

              
              if (li.classList.contains('list__delete') && btn.classList.contains('item__btn_delete-active')) {
                
                
                li.classList.add('list_fadeOut')
                let liStyle = getComputedStyle(li)
                let time = liStyle.animationDuration
                time = parseFloat(time)

                setTimeout(() => {
                  li.remove()
                  updateData()
                  lists.length === 0 ? btn.classList.remove('item__btn_delete-active') : '';
                  // count--
                }, time * 1000 - 15);
                
              }
            })
          }
        })

      }

    })

  })






}

// export default removeList