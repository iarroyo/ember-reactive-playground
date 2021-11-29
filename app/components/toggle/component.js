import { useState, useCallback } from 'ember-function-component';
export default function useToggle() {
  let [value, setValue] = useState(false);
  const toggle = useCallback(() => {
    value = !value;
    setValue(value);
  });
  return { value, toggle };
}
