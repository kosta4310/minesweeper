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

type State = { cells: { dataCell: Array<DataCell>; count: number } };

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

const initialState = createInitArray();

export const cellSlice = createSlice({
  name: "cell",
  initialState: {
    count: numberOfBomb,
    dataCell: initialState,
  },
  reducers: {
    checkFlag: (state, action) => {
      const curr = state.dataCell[action.payload];
      if (curr.status === CELL_STATUS.INIT && curr.marker === null) {
        curr.marker = CELL_MARKER.FLAG;
        state.count -= 1;
      } else if (
        curr.status === CELL_STATUS.INIT &&
        curr.marker === CELL_MARKER.FLAG
      ) {
        curr.marker = null;
        state.count += 1;
      }
    },
    checkClick: (state, action) => {
      const curr = state.dataCell[action.payload];
      if (curr.status === CELL_STATUS.INIT && curr.marker === null) {
        // curr.status = CELL_STATUS.OPENED;
        openCell(state, action.payload);
        if (curr.bomb) {
          gameOver(state.dataCell);
          curr.marker = CELL_MARKER.BOMB;
          curr.status = CELL_STATUS.BUM;
        } else if (curr.number) {
          curr.marker = CELL_MARKER.NUMBER;
        } else checkCells(state, action.payload);
      }
    },
  },
});

export default cellSlice.reducer;
export const selectCells = (state: State) => state.cells.dataCell;
export const selectCount = (state: State) => state.cells.count;
