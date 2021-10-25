import Controller from '@ember/controller';
import { useTask } from 'ember-resources';
import { tracked } from '@glimmer/tracking';
import { bind } from '@ember/runloop';
import { task, timeout } from 'ember-concurrency';
import { inject as service } from '@ember/service';

export default class RefreshByResourceController extends Controller {
  queryParams = ['user', 'page'];

  @tracked
  user;

  @tracked
  page;

  @service('api/http-client')
  httpClient;

  selectUserByName = bind(this, (user) => {
    this.transitionToRoute({ queryParams: { user: user.name } });
  });

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

  getUser = useTask(this, this.getUser, () => [this.user]);
}
