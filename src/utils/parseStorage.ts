const parseStorage = (value: string) => {
  if (value.includes('TB')) {
    return parseInt(value.replace('TB', ''), 10) * 1024;
  }
  if (value.includes('GB')) {
    return parseInt(value.replace('GB', ''), 10);
  }
  return 0;
};
export default parseStorage;
