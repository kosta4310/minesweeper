import { DataCell } from "./cellSlice";
import { CELL_MARKER, CELL_STATUS } from "./constants";

export function placeBombs() {
  const mapBomb = new Set<number>();

  function random() {
    return Math.floor(Math.random() * 81);
  }

  while (mapBomb.size < 10) {
    const bomb = random();
    mapBomb.add(bomb);
  }

  return mapBomb;
}

export function gameOver(dataCell: Array<DataCell>) {
  dataCell.forEach((cell) => {
    if (cell.bomb && cell.marker !== CELL_MARKER.FLAG) {
      cell.status = CELL_STATUS.OPENED;
      cell.marker = CELL_MARKER.BOMB;
    }
    if (cell.marker === CELL_MARKER.FLAG && !cell.bomb) {
      cell.status = CELL_STATUS.FLAG_FALSY;
    }
  });
}

export function setMarkerBomb(data: Array<DataCell>) {
  const bomb = placeBombs();

  // итерация по бомбам и расставление чисел вокруг бомб
  for (const item of bomb.values()) {
    data[item].bomb = true;

    const [i, j] = data[item].id.split("");
    const mapIdOfIndex = getMapIdOfIndex(data);

    for (let k = +i - 1; k <= +i + 1; k++) {
      for (let n = +j - 1; n <= +j + 1; n++) {
        if (k >= 1 && k <= 9 && n >= 1 && n <= 9) {
          const indexOfArray = mapIdOfIndex.get(k + "" + n) as number;
          const num = data[indexOfArray].number;
          data[indexOfArray].number = num ? num + 1 : 1;
        }
      }
    }
  }
}

function getMapIdOfIndex(data: Array<DataCell>) {
  const mapIdOfIndex = new Map<string, number>();

  data.forEach((cell, ind) => {
    mapIdOfIndex.set(cell.id, ind);
  });

  return mapIdOfIndex;
}

export function checkCells(
  value: { dataCell: Array<DataCell>; counterOpenedCell: number },
  index: number
) {
  const data = value.dataCell;
  const [i, j] = data[index].id.split("");
  const mapIdOfIndex = getMapIdOfIndex(data);
  const willOpenEmpty = new Set<number>();
  const willOpenNumber = new Set<number>();

  searchCells(+i, +j);

  if (willOpenEmpty.size) {
    for (const ind of willOpenEmpty.values()) {
      // data[ind].status = CELL_STATUS.OPENED;
      openCell(value, ind);
    }
  }

  if (willOpenNumber.size) {
    for (const ind of willOpenNumber.values()) {
      // data[ind].status = CELL_STATUS.OPENED;
      openCell(value, ind);
      data[ind].marker = CELL_MARKER.NUMBER;
    }
  }

  function searchCells(i: number, j: number) {
    const willCheckCells = [];

    for (let k = i - 1; k <= i + 1; k++) {
      for (let n = j - 1; n <= j + 1; n++) {
        if (k >= 1 && k <= 9 && n >= 1 && n <= 9) {
          const indexOfArray = mapIdOfIndex.get(k + "" + n) as number;
          const num = data[indexOfArray].number;

          if (num) {
            willOpenNumber.add(indexOfArray);
          } else {
            if (!willOpenEmpty.has(indexOfArray)) {
              willOpenEmpty.add(indexOfArray);
              willCheckCells.push(indexOfArray);
            }
          }
        }
      }
    }

    if (willCheckCells.length) {
      willCheckCells.forEach((item) => {
        const [i, j] = data[item].id.split("");
        searchCells(+i, +j);
      });
    }
  }
}

export function openCell(
  data: { dataCell: Array<DataCell>; counterOpenedCell: number },
  index: number
) {
  data.counterOpenedCell += 1;
  const currentCell = data.dataCell[index];
  currentCell.status = CELL_STATUS.OPENED;
}
