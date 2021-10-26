import Service from '@ember/service';
import SearchContext from 'ember-reactive-playground/models/search-context';
import { tracked } from '@glimmer/tracking';

export default class SearchService extends Service {
  @tracked
  searchContext = new SearchContext();

  updateContext(context) {
    this.searchContext.update(context);
  }
}
