import { createSlice } from "@reduxjs/toolkit";
import { CELL_STATUS, CELL_MARKER } from "./constants";
// import { useDispatch } from "react-redux";

type DataCell = {
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
        bomb: true,
      });
    }
  }

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
          curr.marker = CELL_MARKER.BOMB;
        }
      }
      console.log(state);
    },
  },
});

// export const { checkFlag } = cellSlice.actions;
export default cellSlice.reducer;
export const selectCells = (state: { cells: Array<DataCell> }) => state.cells;
// export default function saperReducer(
//   state = initialState,
//   action: { type: string; payload: number }
// ) {
//   switch (action.type) {
//     case "setFlag":
//       console.log("reducer");

// const changedCell: DataCell = { ind: action.payload, status: "flag" };
// const newState = [...state];
// newState[action.payload] = changedCell;
// const newState = [...state];
// const newState = state.map((e) => {
//   if (e.ind === action.payload) {
//     return { ind: action.payload, status: "flag" };
//   }
//   return e;
// });
//     newState[action.payload] = { ind: action.payload, status: "flag" };
//     console.log(newState);

//     return newState;
//   default:
//     return state;
// }
// }
