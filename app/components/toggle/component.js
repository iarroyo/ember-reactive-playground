import { useState, useCallback } from 'ember-function-component';
export default function useToggle() {
  let [value, setValue] = useState(false);
  const date = new Date();
  value = !value;
  const toggle = useCallback(
    () => console.log(value) || console.log(date) || setValue(value)
  );

  return { value, toggle };
}
