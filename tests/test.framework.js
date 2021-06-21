function assertCellsEqual(expected, actual) {
  if (expected.row === actual.row && expected.col === actual.col)
    pass('Cells are equal');
  else {
    fail('Cells are not equal');
    info('expected', expected);
    info('actual', actual);
  }
}

const pass = message => console.log('PASS: ', message);
const fail = message => console.error('FAIL: ', message);
const info = message => console.log('INFO: ', message);