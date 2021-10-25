import { Factory } from 'ember-cli-mirage';
import faker from 'faker';

export default Factory.extend({
  id(i) {
    return i;
  },
  createdAt() {
    return faker.date.past().toDateString();
  },
  name() {
    return `${faker.name.firstName()} ${faker.name.lastName()}`;
  },
  avatar() {
    return faker.image.avatar();
  },
});
