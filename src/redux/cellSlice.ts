import { createSlice } from "@reduxjs/toolkit";
import { CELL_STATUS, CELL_MARKER } from "./constants";
import { checkCells, gameOver, placeBombs, setMarkerBomb } from "./utils";

export type DataCell = {
  id: string;
  status: string;
  marker: string | null;
  bomb: boolean;
  number: undefined | number;
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

const initialState = createInitArray();

export const cellSlice = createSlice({
  name: "cell",
  initialState: initialState,
  reducers: {
    checkFlag: (state, action) => {
      const curr = state[action.payload];
      if (curr.status === CELL_STATUS.INIT && curr.marker === null) {
        curr.marker = CELL_MARKER.FLAG;
      } else if (
        curr.status === CELL_STATUS.INIT &&
        curr.marker === CELL_MARKER.FLAG
      ) {
        curr.marker = null;
      }
    },
    checkClick: (state, action) => {
      const curr = state[action.payload];
      if (curr.status === CELL_STATUS.INIT && curr.marker === null) {
        curr.status = CELL_STATUS.OPENED;
        if (curr.bomb) {
          gameOver(state);
          curr.marker = CELL_MARKER.BOMB;
          curr.status = CELL_STATUS.BUM;
        } else if (curr.number) {
          // curr.status = CELL_STATUS.OPENED;
          curr.marker = CELL_MARKER.NUMBER;
        } else checkCells(state, action.payload);
      }
      console.log(state);
    },
  },
});

export default cellSlice.reducer;
export const selectCells = (state: { cells: Array<DataCell> }) => state.cells;
