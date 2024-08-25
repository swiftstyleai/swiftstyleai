// https://github.com/jxson/front-matter/tree/master

import * as parser from 'js-yaml';

// Optional Byte Order Mark pattern.
const optionalByteOrderMark = '\\ufeff?';

// Detect platform.
const platform = typeof process !== 'undefined' ? process.platform : '';

// YAML front matter pattern.
const pattern =
  '^(' +
  optionalByteOrderMark +
  '(= yaml =|---)' +
  '$([\\s\\S]*?)' +
  '^(?:\\2|\\.\\.\\.)\\s*' +
  '$' +
  (platform === 'win32' ? '\\r?' : '') +
  '(?:\\n)?)';

// Compiled regular expression for matching YAML front matter.
const regex = new RegExp(pattern, 'm');

// Extractor function for parsing the front matter from a string.
function extractor<T = Record<string, any>>(
  string: string
): FrontMatterResult<T> {
  string = string || '';

  const lines = string.split(/(\r?\n)/);
  if (lines[0] && /= yaml =|---/.test(lines[0])) {
    return parse<T>(string);
  } else {
    return {
      metadata: {} as T,
      body: string,
      bodyBegin: 1,
    };
  }
}

// Compute the line location where the body begins after front matter.
function computeLocation(match: RegExpExecArray, body: string): number {
  let line = 1;
  let pos = body.indexOf('\n');
  const offset = match.index + match[0].length;

  while (pos !== -1) {
    if (pos >= offset) {
      return line;
    }
    line++;
    pos = body.indexOf('\n', pos + 1);
  }

  return line;
}

// Define the result type for the front matter extraction.
export interface FrontMatterResult<T> {
  readonly metadata: T;
  readonly body: string;
  readonly bodyBegin: number;
  readonly frontmatter?: string;
}

// Parse the front matter from the string.
function parse<T>(string: string): FrontMatterResult<T> {
  const match = regex.exec(string);
  if (!match) {
    return {
      metadata: {} as T,
      body: string,
      bodyBegin: 1,
    };
  }

  // const yaml = match[match.length - 1].replace(/^\s+|\s+$/g, '');
  // Safely access the last element of the match
  const yaml = (match[match.length - 1] || '').replace(/^\s+|\s+$/g, '');

  const metadata = (parser.load(yaml) as T) || ({} as T);
  const body = string.replace(match[0], '');
  const line = computeLocation(match, string);

  return {
    metadata,
    body: body,
    bodyBegin: line,
    frontmatter: yaml,
  };
}

// Test if a string contains front matter.
function test(string: string): boolean {
  string = string || '';
  return regex.test(string);
}

// Define the interface for the front matter extractor and test function.
interface FM {
  <T>(file: string): FrontMatterResult<T>;
  test(file: string): boolean;
}

// Create the fm object that includes the extractor and test function.
const fm: FM = extractor as FM;
fm.test = test;

export default fm;
