import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | refresh-by-model', function (hooks) {
  setupTest(hooks);

  test('it exists', function (assert) {
    let route = this.owner.lookup('route:refresh-by-model');
    assert.ok(route);
  });
});
