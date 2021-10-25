import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Service | api/http-client', function (hooks) {
  setupTest(hooks);

  // TODO: Replace this with your real tests.
  test('it exists', function (assert) {
    let service = this.owner.lookup('service:api/http-client');
    assert.ok(service);
  });
});
