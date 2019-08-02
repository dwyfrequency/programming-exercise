const fs = require('fs');
const util = require('util');

// convert readFile to promise so we can use chaining/async await vs. callback
// string -> promise.resolve(fileData)
const readFile = fileName => util.promisify(fs.readFile)(fileName, 'utf-8');

// convert array to comma separated string with new line at end
// array -> string
const rowToCSV = arr => `${arr.join(',')}\n`;

// capitalize string
// string -> string
const capitalize = str => str.toUpperCase();

// invert order of rows
// [array] -> [array]
const invertRows = rows => {
  return rows.reverse();
};

// (array, [array], bool) -> str
const stringifyData = (fields, rows, cap = false) => {
  const header = rowToCSV(fields);
  const rowStr = rows.map(innerArr => rowToCSV(innerArr)).join('');
  const returnStr = header + (cap ? capitalize(rowStr) : rowStr);
  return returnStr;
};

module.exports = {
  rowToCSV,
  capitalize,
  readFile,
  invertRows,
  stringifyData,
};
