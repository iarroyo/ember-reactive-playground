import Component from '@glimmer/component';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import { cached } from '@glimmer/tracking';

export default class PaginationContainer extends Component {
  @service
  search;

  @service
  router;

  get currentPage() {
    return parseInt(this.search.searchContext.page || 1);
  }

  @cached
  get numberOfPages() {
    return (
      (this.args.size || 0) / (this.search.searchContext.itemsPerPage || 0)
    );
  }

  get pages() {
    let pages;
    let BASIC_PAGINATION_PAGES = 8;
    let LEFT_ITEMS_PAGINATION = 5;
    let RIGHT_ITEMS_PAGINATION = 5;

    if (this.numberOfPages < BASIC_PAGINATION_PAGES) {
      let i = 1;
      pages = Array.from(Array(this.numberOfPages), () => i++);
    } else {
      if (this.currentPage <= LEFT_ITEMS_PAGINATION) {
        const firstPages = Array.from(
          Array(LEFT_ITEMS_PAGINATION),
          (_, index) => index + 1
        );
        pages = [...firstPages, '...', this.numberOfPages];
      } else if (this.currentPage > this.numberOfPages - 5) {
        pages = [1, '...'];
        let i = this.numberOfPages - RIGHT_ITEMS_PAGINATION;
        while (i < this.numberOfPages) {
          pages.push(++i);
        }
      } else {
        pages = [
          1,
          '...',
          this.currentPage - 1,
          this.currentPage,
          this.currentPage + 1,
          '...',
          this.numberOfPages,
        ];
      }
    }

    return pages;
  }

  transitionToPage(pageNumber) {
    this.router.transitionTo({
      queryParams: { page: pageNumber },
    });
  }

  @action
  change(value, event) {
    event.preventDefault();
    this.transitionToPage(value);
  }

  @action
  increment(event) {
    event.preventDefault();
    this.transitionToPage(this.currentPage + 1);
  }

  @action
  decrement(event) {
    event.preventDefault();
    this.transitionToPage(this.currentPage - 1);
  }
}
