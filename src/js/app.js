import { isWebP } from './modules/isWebP.js';
import { themeSwitcher } from './modules/themeSwitcher.js';
import { searchRepos } from './modules/searchRepos.js';

isWebP();
themeSwitcher('.switcher');

const form = document.forms.form;
const repoList = document.querySelector('.repo-list');
const searchField = form.elements.repo;
const searchError = document.querySelector('.search-error');

form.onsubmit = (e) => {
  e.preventDefault();
  const searchValue = searchField.value.trim();

  if (!searchValue) return;
  if (searchValue.length < 3) {
    searchError.hidden = false;
    return;
  }

  searchRepos(searchValue, repoList);
};

searchField.oninput = () => {
  if (searchError.hidden) return;
  searchError.hidden = true;
};

repoList.onclick = (e) => {
  const tgt = e.target.closest('li.repo-tag');
  if (!tgt) return;

  let searchValue = `in:topics ${tgt.textContent}`;
  searchField.value = searchValue;
  searchRepos(searchValue, repoList);
};
