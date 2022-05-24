import Component from '@glimmer/component';
import { trackedTask } from 'ember-resources/util/ember-concurrency';
import { task } from 'ember-concurrency';
import { inject as service } from '@ember/service';

export default class UserDetailContainer extends Component {
  @service
  search;

  @service('api/http-client')
  httpClient;

  @task
  *getUser(userName) {
    console.log('getUser');
    let data = [];

    if (userName) {
      const abortController = new AbortController();
      const signal = abortController.signal;

      try {
        data = yield this.httpClient.GET(
          `https://5f7dc195834b5c0016b06816.mockapi.io/api/v1/users?name=${userName}`,
          {},
          signal
        );
      } catch (e) {
        data.error = e;
      } finally {
        abortController.abort();
      }
    }
    return data;
  }

  getUser = trackedTask(this, this.getUser, () => [
    this.search.searchContext.user,
  ]);
}
