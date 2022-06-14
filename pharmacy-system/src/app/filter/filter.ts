export type FilterOptions = {
  ignoreCase?: boolean;
  stripNonCharacters?: boolean;
  normalizeLatin?: boolean;
  matchAll?: boolean;
  matchRegExp?: (str: string) => RegExp;
};

const defaultFilterOptions: FilterOptions = {
  ignoreCase: true,
  stripNonCharacters: true,
  matchAll: true, // filter returns true only if all fields match expression
  normalizeLatin: true, // converts latin chars to normal English chars eg. Č -> C
  // describes how to match the string. Default behaviour is matching the start of the string
  matchRegExp: (str: string) => new RegExp(`^${str}.*`, "gim"),
};

const nonCharRegex = /\W/g;

const applyOptions = (str: string, options: FilterOptions): string => {
  if (options.ignoreCase) {
    str = str.toLowerCase();
  }

  if (options.stripNonCharacters) {
    str = str.replace(nonCharRegex, str);
  }

  if (options.normalizeLatin) {
    str = str.normalize("NFKD");
  }

  return str;
};

export const genericFilter = (searchDataArray: string[], searchString: string, options = defaultFilterOptions) => {
  if (!searchString) {
    return true;
  }
  options = {...defaultFilterOptions, ...options};

  const searchWords = searchString
    .split(/\s+/)
    .map(s => applyOptions(s, options));

  const searchDataString = searchDataArray
    .map(s => applyOptions(s, options).replace(/\s+/, "\n"))
    .join("\n");

  if (options.matchAll) {
    return searchWords.every(str => {
      // tslint:disable-next-line:no-non-null-assertion
      return searchDataString.match(options.matchRegExp!(str));
    });
  } else {
    return searchWords.some(str => {
      // tslint:disable-next-line:no-non-null-assertion
      return searchDataString.match(options.matchRegExp!(str));
    });
  }
};
