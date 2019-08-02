const {
  rowToCSV,
  capitalize,
  readFile,
  invertRows,
  stringifyData,
} = require('./utils');

describe('utils', () => {
  describe('promisified readFile', () => {
    const fileName = './sample.json';

    test('should return promise and resolve with file data', async () => {
      const data = await readFile(fileName);
      expect(typeof data).toBe('string');
    });

    test('should fail with incorrect file name', async () => {
      try {
        await readFile('./wrongName.json');
      } catch (error) {
        expect(error.message).toMatch(/no such file/gi);
      }
    });

    describe('rowToCSV', () => {
      test('should convert array to comma separated string with new line at end', () => {
        expect(rowToCSV([1, 2, 3])).toBe('1,2,3\n');
        expect(rowToCSV(['test', 2, 'be'])).toBe('test,2,be\n');
      });

      describe('capitalize', () => {
        test('should returns string in all caps ', () => {
          expect(capitalize('beeL')).toBe('BEEL');
          expect(capitalize('user1name')).toBe('USER1NAME');
        });
      });

      describe('invertRows', () => {
        test('#1 should invert the order of the rows in the subarray', () => {
          const nestedArr = [[1, 2], [3, 4]];
          expect(invertRows(nestedArr)).toEqual([[3, 4], [1, 2]]);
        });
        test('#2 should invert the order of the rows in the subarray', () => {
          const nestedArr = [['ba', 1], [3, 'cd']];
          expect(invertRows(nestedArr)).toEqual([[3, 'cd'], ['ba', 1]]);
        });
      });

      describe('stringifyData', () => {
        const headers = ['Col1', 'Col2', 'Col3'];
        const rows = [
          ['r0cd0', 'r0cd1', 'r0cd2', 4],
          ['r1cd0', 'r1cd1', 'r1cd2', 5],
        ];
        test('#1 should combine header and rows into single string', () => {
          expect(stringifyData(headers, rows)).toBe(
            `Col1,Col2,Col3\nr0cd0,r0cd1,r0cd2,4\nr1cd0,r1cd1,r1cd2,5\n`
          );
        });
        test('#2 should capitalize rows of string when cap param passed', () => {
          expect(stringifyData(headers, rows, true)).toBe(
            `Col1,Col2,Col3\nR0CD0,R0CD1,R0CD2,4\nR1CD0,R1CD1,R1CD2,5\n`
          );
        });
      });
    });
  });
});
