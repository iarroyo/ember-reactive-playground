import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import { trackedFunction } from 'ember-resources/util/function';
import faker from 'faker';

export default class IndexController extends Controller {
  queryParams = ['query', 'queryRefreshModel', 'page'];

  @tracked
  query;

  @tracked
  queryRefreshModel;

  @service
  router;

  @action
  transitionTo() {
    const query = faker.name.firstName();
    this.router.transitionTo('index', { queryParams: { query: query } });
  }

  @action
  refreshResultsByModel() {
    const query = faker.name.firstName();
    this.router.transitionTo('index', {
      queryParams: { queryRefreshModel: query },
    });
  }

  searchResults = trackedFunction(
    this,
    async (state, ...args) => {
      const [query] = args;
      let searchResults = [];

      if (state?.results && state?.query === query) {
        searchResults = state.results;
      } else {
        if (query) {
          for (let i = 0; i < 10; i++) {
            searchResults.push({
              title: faker.lorem.word(),
            });
          }
        }
      }

      return {
        query: query,
        results: searchResults,
      };
    },
    () => [this.query]
  );
}
