import { Repo } from './Repo.js';
import { Query } from './Query.js';

const reposQuery = new Query('https://api.github.com/search/repositories');

export const searchRepos = async (
  value,
  repoList,
  messageSelector = '.message',
  spinnerSelector = '.spinner'
) => {
  const message = document.querySelector(messageSelector);
  const spinner = document.querySelector(spinnerSelector);

  if (value === reposQuery.lastQuery) return;

  repoList.innerHTML = '';
  message.hidden = true;
  spinner.hidden = false;

  const repos = await reposQuery.getItems(value);
  if (reposQuery.loading) return;
  spinner.hidden = true;

  if (reposQuery.errorStatus) {
    message.hidden = false;
    message.textContent = `Something went wrong.. Error status: ${reposQuery.errorStatus}`;
    return;
  }

  if (repos.length === 0) {
    message.hidden = false;
    message.textContent = 'No results found.. Try another search';
    return;
  }

  for (let repo of repos) {
    repoList.append(Repo(repo));
  }
};
