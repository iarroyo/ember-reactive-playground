import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import { task, timeout } from 'ember-concurrency';

export default class RefreshByModelRoute extends Route {
  queryParams = {
    user: {
      refreshModel: true,
    },
    page: {
      refreshModel: true,
    },
  };

  @service('api/http-client')
  httpClient;

  beforeModel(transition) {
    const queryParams = transition.to.queryParams;
    if (parseInt(queryParams.page) < 1) {
      queryParams.page = 1;
      transition.abort();
      this.transitionTo('refresh-by-model', {
        queryParams: queryParams,
      });
    }
  }

  model(params) {
    const user = params.user;
    const page = params.page;
    const model = {
      getAllUsersTask: this.getAllUsers.perform(page),
    };
    if (user) {
      model['getUserTask'] = this.getUser.perform(user);
    }
    return model;
  }

  @task
  *getUser(userName) {
    const data = {
      result: [],
      error: null,
    };
    const abortController = new AbortController();
    const signal = abortController.signal;

    try {
      yield timeout(2000); //simulate slow api
      data.result = yield this.httpClient.GET(
        `https://5f7dc195834b5c0016b06816.mockapi.io/api/v1/users?name=${userName}`,
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

  @task
  *getAllUsers(page) {
    let data = {
      results: [],
      error: null,
    };
    const abortController = new AbortController();
    const signal = abortController.signal;

    try {
      yield timeout(2000); //simulate slow api
      data = yield this.httpClient.GET(
        `https://5f7dc195834b5c0016b06816.mockapi.io/api/v1/users?page=${page}`,
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
