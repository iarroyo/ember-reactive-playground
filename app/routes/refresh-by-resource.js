import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class RefreshByResourceRoute extends Route {
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

  @service
  search;

  model(params) {
    const user = params.user,
      page = params.page;

    this.search.updateContext({
      user: user,
      page: page,
      itemsPerPage: 25,
    });
    return null;
  }
}
