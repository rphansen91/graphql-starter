export default function parse(str: string) {
  if (!str) return {};
  return str
    .split(/&|;/g)
    .map(v => v.split('='))
    .reduce((params: any, entry) => {
      params[entry[0]] = entry[1];
      return params;
    },      {});
}
