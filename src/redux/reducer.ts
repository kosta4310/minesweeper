type DataCell = { ind: number; status: string };

function createInitArray() {
  const data: Array<DataCell> = [];

  for (let i = 0; i < 81; i++) {
    data.push({ ind: i, status: "init" });
  }

  return data;
}

const initialState = createInitArray();

export default function saperReducer(
  state = initialState,
  action: { type: string; payload: number }
) {
  switch (action.type) {
    case "setFlag":
      console.log("reducer");

      // const changedCell: DataCell = { ind: action.payload, status: "flag" };
      // const newState = [...state];
      // newState[action.payload] = changedCell;
      const newState = [...state];
      // const newState = state.map((e) => {
      //   if (e.ind === action.payload) {
      //     return { ind: action.payload, status: "flag" };
      //   }
      //   return e;
      // });
      newState[action.payload] = { ind: action.payload, status: "flag" };
      console.log(newState);

      return newState;
    default:
      return state;
  }
}
