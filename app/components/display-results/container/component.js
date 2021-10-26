import Component from '@glimmer/component';
import { task } from 'ember-concurrency';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { useTask } from 'ember-resources';

export default class DisplayResultsContainer extends Component {
  @service('api/http-client')
  httpClient;

  @service
  router;

  @service
  search;

  selectUserByName = (user) => {
    this.router.transitionTo({ queryParams: { user: user.name } });
  };

  @task
  *getAllUsers(page) {
    let data = {
      results: [],
      error: null,
    };
    const abortController = new AbortController();
    const signal = abortController.signal;

    try {
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

  getAllUsers = useTask(this, this.getAllUsers, () => [
    this.search.searchContext.page,
  ]);
}
