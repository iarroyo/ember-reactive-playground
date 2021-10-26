import { tracked } from '@glimmer/tracking';

export default class SearchContext {
  @tracked
  user;

  @tracked
  page;

  @tracked
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
