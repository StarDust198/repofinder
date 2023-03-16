import { Repo } from './Repo.js';
import { reposQuery } from './reposQuery.js';

let lastQuery = '';

export const searchRepos = async (
  value,
  repoList,
  messageSelector = '.message',
  spinnerSelector = '.spinner'
) => {
  const message = document.querySelector(messageSelector);
  const spinner = document.querySelector(spinnerSelector);

  if (value === lastQuery) return;
  lastQuery = value;

  repoList.innerHTML = '';
  message.hidden = true;
  spinner.hidden = false;

  const repos = await reposQuery(value);

  spinner.hidden = true;
  if (repos.length === 0) {
    message.hidden = false;
    message.textContent = 'No results found.. Try another search';
    return;
  }

  for (let repo of repos) {
    repoList.append(Repo(repo));
  }
};
