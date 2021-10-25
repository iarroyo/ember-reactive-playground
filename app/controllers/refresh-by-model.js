import Controller from '@ember/controller';
import { bind } from '@ember/runloop';
import { tracked } from '@glimmer/tracking';

export default class RefreshByModelController extends Controller {
  queryParams = ['user', 'page'];

  @tracked
  user;

  @tracked
  page = 1;

  get currentPage() {
    return parseInt(this.page);
  }

  selectUserByName = bind(this, (user) => {
    this.transitionToRoute({ queryParams: { user: user.name } });
  });
}
