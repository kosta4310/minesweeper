import { createSlice } from "@reduxjs/toolkit";
import { CELL_STATUS, CELL_MARKER, numberOfBomb } from "./constants";
import { checkCells, gameOver, openCell, setMarkerBomb } from "./utils";

export type DataCell = {
  id: string;
  status: string;
  marker: string | null;
  bomb: boolean;
  number: undefined | number;
};

type State = {
  cells: {
    dataCell: Array<DataCell>;
    flagCounter: number;
    startTimer: boolean;
    counterOpenedCell: number;
  };
};

function createInitArray() {
  const data: Array<DataCell> = [];

  for (let i = 1; i < 10; i++) {
    for (let j = 1; j < 10; j++) {
      const element = i + "" + j;
      data.push({
        id: element,
        status: CELL_STATUS.INIT,
        marker: null,
        bomb: false,
        number: undefined,
      });
    }
  }

  setMarkerBomb(data);

  return data;
}

const initDataCell = createInitArray();
const initData = {
  flagCounter: numberOfBomb,
  dataCell: initDataCell,
  startTimer: false,
  counterOpenedCell: 0,
};

export const cellSlice = createSlice({
  name: "cell",
  initialState: initData,
  reducers: {
    checkFlag: (state, action) => {
      const curr = state.dataCell[action.payload];
      if (curr.status === CELL_STATUS.INIT && curr.marker === null) {
        curr.marker = CELL_MARKER.FLAG;
        state.flagCounter -= 1;
      } else if (
        curr.status === CELL_STATUS.INIT &&
        curr.marker === CELL_MARKER.FLAG
      ) {
        curr.marker = null;
        state.flagCounter += 1;
      }
    },
    checkClick: (state, action) => {
      const curr = state.dataCell[action.payload];
      if (curr.status === CELL_STATUS.INIT && curr.marker === null) {
        openCell(state, action.payload);
        if (curr.bomb) {
          state.startTimer = false;
          gameOver(state.dataCell);
          curr.marker = CELL_MARKER.BOMB;
          curr.status = CELL_STATUS.BUM;
          state.startTimer = false;
        } else if (curr.number) {
          curr.marker = CELL_MARKER.NUMBER;
        } else checkCells(state, action.payload);
      }

      if (state.flagCounter === 0 && state.counterOpenedCell === 71) {
        state.startTimer = false;
      }
      console.log(state.counterOpenedCell);
    },
    setStartTimer: (state, action) => {
      state.startTimer = true;
    },
    incrementOpenedCell: (state, action) => {
      state.counterOpenedCell = state.counterOpenedCell + 1;
    },
  },
});

export default cellSlice.reducer;
export const selectCells = (state: State) => state.cells.dataCell;
export const selectCount = (state: State) => state.cells.flagCounter;
export const selectIncrementOpenedCell = (state: State) =>
  state.cells.counterOpenedCell;
export const selectStartTimer = (state: State) => state.cells.startTimer;
