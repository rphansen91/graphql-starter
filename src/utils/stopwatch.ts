const NS_PER_SEC = 1e9;
const MS_PER_NS = 1e6;

export default () => {
  const time = process.hrtime();
  return () => {
    const diff = process.hrtime(time);
    return (diff[0] * NS_PER_SEC + diff[1]) / MS_PER_NS;
  };
};
