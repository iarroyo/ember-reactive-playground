import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import { task, timeout } from 'ember-concurrency';

export default class RefreshByResourceRoute extends Route {
  @service('api/http-client')
  httpClient;

  model() {
    const model = {
      getAllUsersTask: this.getAllUsers.perform(),
    };
    return model;
  }

  @task
  *getAllUsers() {
    const data = {
      results: [],
      error: null,
    };
    const abortController = new AbortController();
    const signal = abortController.signal;

    try {
      yield timeout(2000); //simulate slow api
      data.results = yield this.httpClient.GET(
        'https://5f7dc195834b5c0016b06816.mockapi.io/api/v1/users',
        {},
        signal
      );
    } catch (e) {
      data.error = e;
    } finally {
      abortController.abort();
    }
    return data;
  }
}
