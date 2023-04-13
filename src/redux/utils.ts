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

export function gameOver(state: Array<DataCell>) {
  state.forEach((cell) => {
    if (cell.bomb && cell.marker !== CELL_MARKER.FLAG) {
      cell.status = CELL_STATUS.OPENED;
      cell.marker = CELL_MARKER.BOMB;
    }
    if (cell.marker === CELL_MARKER.FLAG && !cell.bomb) {
      cell.status = CELL_STATUS.FLAG_FALSY;
    }
  });
}
