'use strict';

import updateData from './modules/updateData'; //
import inputChange from './modules/inputChange'; //
import addDateCard from './modules/addDateCard'; //
import calcScroll from './modules/calcScroll'; //
import Card from './modules/Card'; //
import difference from './modules/difference'; //
import closeCard from './modules/closeCard'; //
import addCard from './modules/addCard'; //
import addList from './modules/addList'; //
import removeList from './modules/removeList'; //
import renameList from './modules/renameList'; //
import scrollTo from './modules/scrollToInput'; //
import completeList from './modules/completeList'; //
import validation from './modules/validation'; //
import modals from './modules/modals'; //
import openProfile from './modules/openProfile'; //
import renderCardsForData from './modules/renderCardsForData'; //

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
