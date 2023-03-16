const localDate = new Intl.DateTimeFormat('en-GB', {
  day: 'numeric',
  month: 'short',
  year: 'numeric',
});

export const Repo = (props) => {
  const newRepo = document.createElement('li');
  newRepo.classList.add('repo');
  const updatedDate = localDate.format(new Date(props.updated_at));

  const getDescription = (descr) => `
    <p class="repo-description${descr ? '' : ' empty'}">
			${descr || 'No description available yet..'}
		</p>
  `;

  newRepo.innerHTML = `
		<h3 class="repo-creator">
			by <a target="_blank" href="${props.owner.html_url}">${props.owner.login}</a>
		</h3>

		<h2 class="repo-title">
			<a target="_blank" href="${props.html_url}">
				${props.name}
			</a>
		</h2>

		<div class="repo-updated">updated at: ${updatedDate}</div>

		${getDescription(props.description)}
	`;

  if (props.topics.length) {
    const repoTopics = document.createElement('ul');
    repoTopics.classList.add('repo-topics');

    for (let tag of props.topics) {
      const repoTag = document.createElement('li');
      repoTag.classList.add('repo-tag');
      repoTag.textContent = tag;

      repoTopics.append(repoTag);
    }

    newRepo.append(repoTopics);
  } else {
    newRepo.append(document.createElement('br'));
  }

  return newRepo;
};
