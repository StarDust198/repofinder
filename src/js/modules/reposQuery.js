const url = new URL('https://api.github.com/search/repositories');
url.searchParams.set('per_page', 10);

export const reposQuery = async (query) => {
  url.searchParams.set('q', query);

  const response = await fetch(url.href);
  const json = await response.json();
  return json.items;
};
