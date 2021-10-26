import { helper } from '@ember/component/helper';
import { isNone as utilsIsNone } from '@ember/utils';

export function isNone(params /*, hash*/) {
  const [item] = params;
  return utilsIsNone(item);
}

export default helper(isNone);
