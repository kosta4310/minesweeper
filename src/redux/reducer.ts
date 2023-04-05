function createInitArray() {
  const data = [];

  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      const el = i + "" + j;
      data.push({ number: el, status: "init" });
    }
  }

  return data;
}

const initialState = createInitArray();

export default function (state = initialState, action: any) {
  return state;
}
