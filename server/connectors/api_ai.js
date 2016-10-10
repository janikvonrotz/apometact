import config from '/imports/config.js';
import requestPromise from 'request-promise';

let options = {
  headers: {
      'Authorization': `Bearer ${config.API_AI.ACCESS_TOKEN}`
  },
  json: true
};

const Entities = {
  getAll() {
    options.url = `${config.API_AI.URL}entities`;
    options.method = 'GET';
    return requestPromise(options)
      .then(function (entities) {
        return entities;
      });
  },
  get(id) {
    options.url = `${config.API_AI.URL}entities/${id}`;
    options.method = 'GET';
    return requestPromise(options)
      .then(function (entities) {
        return entities;
      });
  },
  createEntries(id, entries) {
    options.url = `${config.API_AI.URL}entities/${id}/entries`;
    options.method = 'POST';
    options.body = entries;
    return requestPromise(options)
      .then(function (response) {
        return entries;
      })
  },
  updateEntries(id, entries) {
    options.url = `${config.API_AI.URL}entities/${id}/entries`;
    options.method = 'PUT';
    options.body = entries;
    return requestPromise(options)
      .then(function (response) {
        return entries;
      })
  }
};

export { Entities };
