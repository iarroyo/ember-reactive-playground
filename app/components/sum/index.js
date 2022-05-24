import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { trackedFunction } from 'ember-resources/util/function';
import { resource, use } from 'ember-resources/util/function-resource';

export default class SumComponent extends Component {
  @tracked
  num1;

  @tracked
  num2;

  calculateSum = trackedFunction(this, async () => {
    return Number(this.num1 ?? 0) + Number(this.num2 ?? 0);
  });

  @use calculateSum2 = resource(({ on }) => {
    on.cleanup(() => {
      console.log('destroyed');
    });
    return Number(this.num1 ?? 0) + Number(this.num2 ?? 0);
  });
}
