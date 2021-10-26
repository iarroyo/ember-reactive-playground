import Route from '@ember/routing/route';
import faker from 'faker';

export default class IndexRoute extends Route {
  queryParams = {
    queryRefreshModel: {
      refreshModel: true,
    },
  };

  beforeModel(transition) {
    const queryParams = transition.to.queryParams;
    if (parseInt(queryParams.page) < 1) {
      queryParams.page = 1;
      transition.abort();
      this.transitionTo('index', {
        queryParams: queryParams,
      });
    }
  }

  model() {
    const searchResults = [];
    for (let i = 0; i < 10; i++) {
      searchResults.push({
        title: faker.lorem.word(),
      });
    }
    return {
      searchResults: searchResults,
    };
  }
}
