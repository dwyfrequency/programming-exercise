/* eslint-disable camelcase */
const { stringifyData, invertRows, readFile } = require('./utils/utils');

// obj -> [arr]
const extractRows = ({ bills_of_lading }) => {
  // arr -> [arr]
  return bills_of_lading.reduce((accum, { bol_number, invoices }) => {
    if (!bol_number) throw Error('bol_number');
    // arr -> [arr]
    const rows = invoices.map(({ invoice_number, items }) => {
      // map through invoice data and grab bol_num and inv_num from closure
      // combine into nested array
      // arr -> [arr]
      return items.map(({ itmno, qty }) => [
        bol_number,
        invoice_number,
        itmno,
        qty,
      ]);
    });
    // need to spread rows b/c it's a nested array and we want it flattened
    return accum.concat(...rows);
  }, []);
};

// (string, obj) -> string
const jsonToCSV = async (
  fileName,
  config = {},
  fieldNames = [`BillOfLading,Invoice,ItemNumber,Quantity`]
) => {
  try {
    const { reverse = null, caps = null } = config;
    const fileContents = await readFile(fileName);
    const jsonData = JSON.parse(fileContents);
    const rows = extractRows(jsonData);
    if (reverse) invertRows(rows);
    const returnStr = stringifyData(fieldNames, rows, caps);
    return returnStr;
  } catch (error) {
    throw error;
  }
};

module.exports = jsonToCSV;
