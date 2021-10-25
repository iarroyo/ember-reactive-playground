import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | refresh-by-resource', function (hooks) {
  setupTest(hooks);

  test('it exists', function (assert) {
    let route = this.owner.lookup('route:refresh-by-resource');
    assert.ok(route);
  });
});
