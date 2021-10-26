import { dedupeTracked } from 'tracked-toolbox';

export default class SearchContext {
  @dedupeTracked
  user;

  @dedupeTracked
  page;

  @dedupeTracked
  itemsPerPage;

  update(context) {
    if (context.user) {
      this.user = context.user;
    }
    if (context.page) {
      this.page = context.page;
    }

    if (context.itemsPerPage) {
      this.itemsPerPage = context.itemsPerPage;
    }
  }
}
