function validation ()  {
  let formSignin = document.querySelector('#signin')
  let formSignup = document.querySelector('#signup')
  let popup = document.querySelectorAll('.popup')
  let popup_signin = formSignin.closest('.popup__signin')
  
  const message = {
    loading: 'Загрузка...',
    success: 'Данные успешно отправлены!',
    failure: 'Произошла ошибка...'
  }

  function isEmpty(form) {
    let inputs = form.querySelectorAll('input')
    let res = false
    inputs.forEach(item => {
      if (item.value !== ''){
        
      }else{
        res = true
      }
    })

    return res
  }

  const postData = async (url, data) => {

    let res = await fetch(url, {
      method: 'POST',
      // headers: {
      //   'Content-Type': 'application/json',  // отправляемые данные 
      // },
      body: data
    })

    return await res.json()

  }

  post(formSignin)
  post(formSignup, true)

  function post(item, isSign = false){
    item.addEventListener('submit', e => {
      e.preventDefault()

      const status = document.createElement('div')
      status.classList.add('popup__status')

      if (item.closest('.popup__block').querySelector('.popup__status') !== null) {
        item.closest('.popup__block').querySelector('.popup__status').remove()
      }

      if (isEmpty(item)) {
        
        item.closest('.popup__block').appendChild(status)
        status.textContent = 'Введите данные'
        setInterval(() => status.remove(), 3000)
        return false
      }

      
      
      let dataForm = {}
      let inputs = item.querySelectorAll('input')
      inputs.forEach(input => {
        let name = input.getAttribute('name')
        let val = input.value
        dataForm[name] = val
      })

      const formData = new FormData()

      for (let key in dataForm){
        formData.append(key, dataForm[key])
      }

      
      if (isSign){
        postData('vendor/signup.php', formData)
          .then(res => {
            console.log(res)
            if (res.status){
              item.closest('.popup__block').appendChild(status)
              status.textContent = res.message
              setTimeout(() => {
                popup.forEach(item => item.style.display = 'none')
                popup_signin.style.display = 'block'
              }, 1500);
            } else{
              item.closest('.popup__block').appendChild(status)
              status.textContent = res.message
            }
            // status.textContent = message.success
          })
          .catch(() => {
            item.appendChild(status)
            status.textContent = message.failure
          })
          .finally(() => {
            setInterval(() => status.remove(), 5000)
          })

      } else {
        postData('vendor/signin.php', formData)
          .then(res => {
            console.log(res)
            if (res.status) {
              popup.forEach(item => item.style.display = 'none')
              item.closest('.popup__block').appendChild(status)
              status.textContent = res.message
              location.reload()
            } else {
              item.closest('.popup__block').appendChild(status)
              status.textContent = res.message
            }
            // status.textContent = message.success
          })
          .catch(() => {
            status.textContent = message.failure
          })
          .finally(() => {
            setInterval(() => status.remove(), 3000)
          })
      }
     

    })
  }

  


}

// export default validation