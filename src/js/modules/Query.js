export function Query(url) {
  this.url = new URL(url);
  this.url.searchParams.set('per_page', 10);
  this.controller = null;
  this.loading = false;
  this.lastQuery = '';
  this.errorStatus = 0;

  this.getItems = async function (query) {
    this.lastQuery = query;
    this.errorStatus = 0;

    this.url.searchParams.set('q', query);

    if (this.controller) {
      this.controller.abort();
    }
    this.controller = new AbortController();

    this.loading = true;

    try {
      const response = await fetch(this.url.href, {
        signal: this.controller.signal,
      });

      if (!response.ok) {
        this.loading = false;
        this.errorStatus = response.status;
        console.log(`Error code: ${this.errorStatus}`);
        return;
      }

      const json = await response.json();
      this.controller = null;
      this.loading = false;
      return json.items;
    } catch (err) {
      if (err.name == 'AbortError') {
        console.log('Aborted!');
        return;
      } else {
        throw err;
      }
    }
  };
}
