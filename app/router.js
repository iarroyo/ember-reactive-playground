import EmberRouter from '@ember/routing/router';
import config from 'ember-reactive-playground/config/environment';

export default class Router extends EmberRouter {
  location = config.locationType;
  rootURL = config.rootURL;
}

Router.map(function () {
  this.route('refresh-by-model');
  this.route('refresh-by-resource');
});
