import { configureStore } from "@reduxjs/toolkit";
// import { counterSlice } from "./counter/counter.slide";
import counterReducer from "./counter/counter.slide";
import { userSlice } from "./user/user.slide";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    user: userSlice.reducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
