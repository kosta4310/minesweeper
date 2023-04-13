import { createSlice } from "@reduxjs/toolkit";
import { CELL_STATUS, CELL_MARKER } from "./constants";
import { gameOver, placeBombs } from "./utils";

export type DataCell = {
  id: number;
  status: string;
  marker: string | null;
  bomb: boolean;
};

function createInitArray() {
  const data: Array<DataCell> = [];

  for (let i = 1; i < 10; i++) {
    for (let j = 1; j < 10; j++) {
      const element = i + "" + j;
      data.push({
        id: Number(element),
        status: CELL_STATUS.INIT,
        marker: null,
        bomb: false,
      });
    }
  }

  const bomb = placeBombs();
  for (const item of bomb.values()) {
    data[item].bomb = true;
  }
  console.log(bomb);

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
        }
      }
      console.log(state);
    },
  },
});

export default cellSlice.reducer;
export const selectCells = (state: { cells: Array<DataCell> }) => state.cells;
