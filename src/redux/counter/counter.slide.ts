import { createSlice } from "@reduxjs/toolkit";

export interface CounterState {
  value: number;
}

const initialState = {
  value: 10,
  name: "hùng",
  age: 20,
};
// đây là slide (reducer + action) nằm trong store
// reducer: công cụ update store
// action: là 1 biến object
export const counterSlice = createSlice({
  name: "counter", //tên
  initialState, //data muốn quản lý
  reducers: {
    // trong đây là các action
    increment: (state) => {
      // state: trạng thái hiện tại
      // Redux Toolkit cho phép chúng ta viết logic "biến đổi" trong các reducer. Nó
      // không thực sự biến đổi trạng thái vì nó sử dụng thư viện Immer,
      // phát hiện các thay đổi đối với "trạng thái nháp" và tạo ra một
      // trạng thái bất biến hoàn toàn mới dựa trên những thay đổi đó
      state.value += 1;
    },
    reduce: (state) => {
      state.value -= 1;
    },
  },
});

// export các action
export const { increment, reduce } = counterSlice.actions;

export default counterSlice.reducer;
