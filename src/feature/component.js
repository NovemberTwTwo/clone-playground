Object.prototype.isObject = (value) => {
  if (typeof value === 'object') {
    if (Array.isArray(value) || value === null) return false;
    return true;
  }
  return false;
};

Object.prototype.isEqual = (prevValue, nextValue) => {
  if (Array.isArray(prevValue) && Array.isArray(nextValue)) {
    if (
      prevValue.filter((value) => nextValue.includes(value)).length !==
      prevValue.length
    ) {
      return false;
    }
  } else if (Object.isObject(prevValue) && Object.isObject(nextValue)) {
    const prevKeys = Object.keys(prevValue);
    const nextKeys = Object.keys(nextValue);

    if (
      prevKeys.filter((value) => nextKeys.includes(value)).length !==
      prevKeys.length
    ) {
      return false;
    }

    for (const key of nextKeys) {
      if (
        (Object.isObject(prevValue[key]) && Object.isObject(nextValue[key])) ||
        (Array.isArray(prevValue[key]) && Array.isArray(nextValue[key]))
      ) {
        if (!Object.isEqual(prevValue[key], nextValue[key])) return false;
      } else if (prevValue[key] !== nextValue[key]) return false;
    }
  } else if (prevValue !== nextValue) {
    return false;
  }
  return true;
};
