import { createSlice } from "@reduxjs/toolkit";
import { CELL_STATUS } from "./constants";
// import { useDispatch } from "react-redux";

type DataCell = { ind: number; status: string };

function createInitArray() {
  const data: Array<DataCell> = [];

  for (let i = 0; i < 81; i++) {
    data.push({ ind: i, status: "init" });
  }

  return data;
}

const initialState = createInitArray();

export const cellSlice = createSlice({
  name: "cell",
  initialState: initialState,
  reducers: {
    // setFlag: (state, action) => {
    //   const curr = state[action.payload];
    //   curr.status = "flag";
    // },
    // delFlag: (state, action) => {
    //   const curr = state[action.payload];
    //   curr.status = "init";
    // },
    checkFlag: (state, action) => {
      const curr = state[action.payload];
      if (curr.status === CELL_STATUS.INIT) curr.status = CELL_STATUS.FLAG;
      else if (curr.status === CELL_STATUS.FLAG) curr.status = CELL_STATUS.INIT;
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
