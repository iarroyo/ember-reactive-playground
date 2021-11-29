import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class ClickOutsideController extends Controller {
  @tracked
  openCategoryA = false;

  @tracked
  openCategoryB = false;

  @action
  onToggleCategoryA() {
    this.openCategoryA = !this.openCategoryA;
  }

  @action
  onCloseCategoryA() {
    this.openCategoryA = false;
  }

  @action
  onToggleCategoryB() {
    this.openCategoryB = !this.openCategoryB;
  }

  @action
  onCloseCategoryB() {
    this.openCategoryB = false;
  }
}
