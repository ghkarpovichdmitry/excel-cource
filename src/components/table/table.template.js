const CODES = { // in order to don't have magic numbers
  A: 65,
  Z: 90
};

function createRow(index, content) {
  const resize =
    index ? '<div class="row-resize" data-resize="row"></div>' : '';
  return `
    <div class="row" data-type="resizable">
        <div class="row-info">${index ? index: ''}${resize}</div>
        <div class="row-data">${content}</div>
    </div>
  `
}

function toColumn(col, index) {
  return `
    <div class="column" data-type="resizable" data-col="${index}">
        ${col}
        <div class="col-resize" data-resize="col"></div>
    </div>
  `
}

// function toCell(_, index) {
//   return `
//     <div class="cell" contenteditable data-col="${index}"></div>
//   `
// }

function toCell(row) {
  return function(_, col) { // why _ ?
    return `
      <div class="cell"
        contenteditable
        data-col="${col}"
        data-type="cell"
        data-id="${row}:${col}"
      ></div>
    `
  }
}

function toChar(_, index) {
  return String.fromCharCode(CODES.A + index);
}

export function createTable(rowsCount = 15) {
  const colsCount = CODES.Z - CODES.A + 1;
  const rows = [];
  const cols = new Array(colsCount)
      .fill('')
      .map(toChar) // return String.fromCharCode(CODES.A + index);
      .map(toColumn) // .map((el) => toColumn(el))
      .join('');

  rows.push(createRow(null, cols));

  for (let row = 0; row < rowsCount; row++) {
    const cells = new Array(colsCount)
        .fill('')
        .map(toCell(row)) // .map((_, col) => toCell(row, col))
        .join('');

    rows.push(createRow(row + 1, cells));
  }

  return rows.join('');
}
