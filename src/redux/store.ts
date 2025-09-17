import { configureStore } from "@reduxjs/toolkit";
// import { counterSlice } from "./counter/counter.slide";
import counterReducer from "./counter/counter.slide";

//redux store, chứa tất cả các state của ứng dụng
export const store = configureStore({
  reducer: {
    //counter: chỉ là cái tên của slide, có thể thay đổi tùy ý
    //reducer như 1 thằng công nhân
    counter: counterReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
