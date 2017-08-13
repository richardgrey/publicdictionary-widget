import 'whatwg-fetch'

let defaults = {
  domain: 'https://bots.publicdictionary.org',
  base: 'pdbots/api/lezgi',
};

export default class API {

  constructor(domain = defaults.domain, base = defaults.base) {
    this.domain = domain;
    this.url_base = base;
  }

  search(str) {
    return fetch(
      this.url({
        query: {
          search: str
        }
      }),
      {
        method: 'POST'
      }
    );
  }

  url({ path, query }) {
    let url = [this.domain, this.url_base, path].join('/');
    let querySet = [];

    Object.keys(query).forEach((key) -> {
      querySet.push(`${key}=${query[key]}`);
    });

    if (querySet.length) {
      url += '?' + querySet.join('&');
    }

    return url;
  }
}