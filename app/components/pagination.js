import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class PaginationComponent extends Component {
  @tracked
  currentPage = this.args.selectedPage || 1;

  @service
  router;

  get pages() {
    let pages;
    let BASIC_PAGINATION_PAGES = 8;
    let LEFT_ITEMS_PAGINATION = 5;
    let RIGHT_ITEMS_PAGINATION = 5;

    if (this.args.numberOfPages < BASIC_PAGINATION_PAGES) {
      let i = 1;
      pages = Array.from(Array(this.args.numberOfPages), () => i++);
    } else {
      if (this.currentPage <= LEFT_ITEMS_PAGINATION) {
        const firstPages = Array.from(
          Array(LEFT_ITEMS_PAGINATION),
          (_, index) => index + 1
        );
        pages = [...firstPages, '...', this.args.numberOfPages];
      } else if (this.currentPage > this.args.numberOfPages - 5) {
        pages = [1, '...'];
        let i = this.args.numberOfPages - RIGHT_ITEMS_PAGINATION;
        while (i < this.args.numberOfPages) {
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
          this.args.numberOfPages,
        ];
      }
    }

    return pages;
  }

  transitionToPage(pageNumber) {
    this.router.transitionTo(this.routeName, {
      queryParams: { page: pageNumber },
    });
  }

  @action
  change(value, event) {
    event.preventDefault();
    this.currentPage = value;
    this.transitionToPage(this.currentPage);
  }

  @action
  increment(event) {
    event.preventDefault();
    if (this.lastPageSelected) return;
    this.currentPage = this.currentPage + 1;
    this.transitionToPage(this.currentPage);
  }

  @action
  decrement(event) {
    event.preventDefault();
    if (this.firstPageSelected) return;
    this.currentPage = this.currentPage - 1;
    this.transitionToPage(this.currentPage);
  }
}
