const results = {
  passes: 0,
  fails: 0
}

function assertCellsEqual(expected, actual) {
  if (expected.row === actual.row && expected.col === actual.col)
    pass('Cells are equal');
  else {
    fail('Cells are not equal');
    info('expected', expected);
    info('actual', actual);
  }
}

const pass = message => {
  console.log('PASS: ', message);
  results.passes++;
}

const fail = message => {
  console.error('FAIL: ', message);
  results.fails++;
}

const info = message => console.log('INFO: ', message);