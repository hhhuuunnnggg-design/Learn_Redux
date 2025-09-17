import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface IUserPayload {
  name: string;
  email: string;
}

export const createNewUser = createAsyncThunk(
  "users/createNewUser",
  async (userPayload: IUserPayload, thunkAPI) => {
    const response = await fetch("http://localhost:8000/users", {
      method: "POST",
      body: JSON.stringify({
        email: userPayload.email,
        name: userPayload.name,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    if (data && data.id) {
      thunkAPI.dispatch(fetchListUser());
    }
    return data;
  }
);

export const updateUser = createAsyncThunk(
  "users/updateUser",
  async (userPayload: IUser, thunkAPI) => {
    const response = await fetch(
      `http://localhost:8000/users/${userPayload.id}`,
      {
        method: "PUT",
        body: JSON.stringify({
          email: userPayload.email,
          name: userPayload.name,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    if (data && data.id) {
      thunkAPI.dispatch(fetchListUser());
    }
    return data;
  }
);

export const deleteUser = createAsyncThunk(
  "users/deleteUser",
  async (userId: number, thunkAPI) => {
    const response = await fetch(`http://localhost:8000/users/${userId}`, {
      method: "DELETE",
    });
    const data = await response.json();
    if (response.ok) {
      thunkAPI.dispatch(fetchListUser());
    }
    return { userId, data };
  }
);
// First, create the thunk
export const fetchListUser = createAsyncThunk(
  "users/fetchListUser",
  async () => {
    const response = await fetch("http://localhost:8000/users");
    return response.json();
  }
);

interface IUser {
  id: number;
  name: string;
  email: string;
}

const initialState: {
  listUser: IUser[];
  isCreateUserSuccess: boolean;
  isUpdateUserSuccess: boolean;
  isDeleteUserSuccess: boolean;
} = {
  listUser: [],
  isCreateUserSuccess: false,
  isUpdateUserSuccess: false,
  isDeleteUserSuccess: false,
};

export const userSlice = createSlice({
  name: "user", //tên
  initialState, //data muốn quản lý
  reducers: {
    // hành động xảy ra bên trong slice
    resetCreateUserSuccess: (state) => {
      state.isCreateUserSuccess = false;
    },
    resetUpdateUserSuccess: (state) => {
      state.isUpdateUserSuccess = false;
    },
    resetDeleteUserSuccess: (state) => {
      state.isDeleteUserSuccess = false;
    },
  },
  // liên quan đến gọi api (Redux thunk) hoặc muốn lắng nghe 1 action của slice khác
  extraReducers: (builder) => {
    builder.addCase(fetchListUser.fulfilled, (state, action) => {
      //  gán dữ liệu vào state, khi call api thành công
      state.listUser = action.payload;
    });
    builder.addCase(createNewUser.fulfilled, (state) => {
      state.isCreateUserSuccess = true;
    });
    builder.addCase(updateUser.fulfilled, (state) => {
      state.isUpdateUserSuccess = true;
    });
    builder.addCase(deleteUser.fulfilled, (state) => {
      state.isDeleteUserSuccess = true;
    });
  },
});

// export các action
export const {
  resetCreateUserSuccess,
  resetUpdateUserSuccess,
  resetDeleteUserSuccess,
} = userSlice.actions;

export default userSlice.reducer;
