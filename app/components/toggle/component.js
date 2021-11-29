import { useState, useCallback, useEffect } from 'ember-function-component';
let effectCounter = 0;
export default function useToggle() {
  let [value, setValue] = useState(false);
  const toggle = useCallback(() => {
    value = !value;
    setValue(value);
  });

  let [count, setCount] = useState(0);

  useEffect(() => {
    if (effectCounter > 0) {
      effectCounter = 0;
      return;
    }
    setCount(count + 1);
    effectCounter = effectCounter + 1;
  });
  return { value, toggle, count };
}
