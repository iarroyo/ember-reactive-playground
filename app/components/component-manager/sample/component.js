import { setComponentManager, setComponentTemplate } from '@ember/component';
import CustomComponentManager from 'ember-reactive-playground/component-managers/custom';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { hbs } from 'ember-cli-htmlbars';

class Sample {
  @tracked
  value = 5;
  static self;

  @action
  onIncrement() {
    this.value = this.value + 1;
  }
}

export default setComponentManager(
  (owner) => CustomComponentManager.create(owner),
  Sample
);

setComponentTemplate(hbs`{{yield this.value this.onIncrement}}`, Sample);
