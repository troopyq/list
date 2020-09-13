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

  function addZero(num) {
    return num >= 10 ? num : `0${num}`;
  }
}

export default addDateCard