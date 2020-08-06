function openProfile (btnSelector, profile) {

  let str = document.cookie;
  let regexp = /user/i;
 

  if (regexp.test(str)) {
    // console.log('yes')
    let btn = document.querySelector(btnSelector)
    let prof = document.querySelector(profile)
    let isStop = true
    let count = 0
    btn.addEventListener('click', () => {
      if (isStop) {
        count++
        isStop = false
        prof.classList.toggle('open__profile')

        // prof.style.visibility = 'visible'
        // prof.style.animationPlayState = 'running'
        let st = getComputedStyle(prof)
        let time = parseFloat(st.transitionDuration)
        // console.log(time)
        setTimeout(() => {
          if (count % 2 === 0) {
            // prof.style.visibility = 'hidden'
            // prof.style.opacity = '0'
          }
          // prof.style.opacity = '1'
          isStop = true
          // prof.style.animationPlayState = 'paused'
        }, time * 1000)
      }
    })
  } else{
    // console.log('no')
  }
  
}

// export default openProfile