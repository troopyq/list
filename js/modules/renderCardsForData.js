import Card from './Card'

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
      res.forEach((item) => {

        renderCard(item);
        // new Card().create(item);
        // console.log(new Card().create());
      });
    })
    .catch(() => {})
    .finally(() => {});

    function renderCard(item) {
      // console.log('передаю данные в рендер');
    
      new Card(item).create();
    }
}

export default renderCardsForData;