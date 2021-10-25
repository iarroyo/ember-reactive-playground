import { helper } from '@ember/component/helper';
import faker from 'faker';

export default helper(function efaker(positional /*, named*/) {
  const [fakerPath] = positional;
  return faker.fake(fakerPath);
});
