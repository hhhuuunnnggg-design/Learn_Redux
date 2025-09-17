# Học Redux qua ví dụ CRUD thực tế

Dự án này là hướng dẫn thực hành để hiểu và áp dụng Redux cho quản lý state trong ứng dụng React. Thay vì ví dụ đếm đơn giản, project minh họa bài toán thật: quản lý danh sách người dùng với đầy đủ CRUD (Create, Read, Update, Delete).

## Kiến thức Redux cốt lõi được áp dụng

Codebase trình bày các khái niệm chính của Redux Toolkit như sau.

### 1. Cấu hình Store (`src/redux/store.ts`)

- **`configureStore`**: Tạo store trung tâm bằng `configureStore` của Redux Toolkit, đơn giản hóa setup và tích hợp sẵn middleware hữu ích cho môi trường phát triển.
- **Kết hợp reducers**: Thuộc tính `reducer` trong `configureStore` cho thấy cách gộp nhiều "slice" từ các tính năng khác nhau (ví dụ: `user` và ví dụ `counter`).

### 2. Slice và Reducer (`src/redux/user/user.slide.ts`)

- **`createSlice`**: Tạo `userSlice` bằng `createSlice`, tự động sinh action creators và action types, giúp giảm đáng kể boilerplate.
- **`initialState`**: Định nghĩa state ban đầu cho `user`, bao gồm mảng `listUser` và các cờ trạng thái như `isCreateUserSuccess`.
- **`reducers`**: Chứa logic đồng bộ để cập nhật state. Ví dụ: `resetCreateUserSuccess` là reducer tiêu chuẩn thao tác trực tiếp trên state.

### 3. Xử lý bất đồng bộ với `createAsyncThunk` (`src/redux/user/user.slide.ts`)

Đây là phần lõi của chức năng CRUD.

- **`createAsyncThunk`**: Dùng để gọi API bất đồng bộ cho:
  - `fetchListUser`: Lấy toàn bộ danh sách users từ server.
  - `createNewUser`: Gửi POST để tạo user mới.
  - `updateUser`: Gửi PUT để cập nhật user.
  - `deleteUser`: Gửi DELETE để xóa user.
- **`extraReducers`**: Nơi tiếp nhận kết quả của các thunk khi `fulfilled` để cập nhật store (ví dụ: gán `state.listUser` sau khi `fetchListUser` thành công).
- **Dispatch bên trong Thunk**: Minh họa cách dispatch action khác từ trong thunk (vd: `thunkAPI.dispatch(fetchListUser())` sau khi tạo thành công) để UI luôn đồng bộ dữ liệu mới nhất.

### 4. Kết nối Redux với giao diện React

- **`Provider` (`src/main.tsx`)**: Toàn bộ ứng dụng được bọc bởi `<Provider store={store}>`, giúp mọi component trong cây truy cập được store.
- **Typed Hooks (`src/redux/hooks.ts`)**: Tạo sẵn `useAppDispatch` và `useAppSelector` (được định kiểu). Điều này tăng an toàn kiểu cho TypeScript khi suy luận kiểu của state và dispatch.
- **Truy cập state và dispatch action**: Component dùng `useAppSelector` để đọc dữ liệu trong store và `useAppDispatch` để dispatch action (cả sync và async thunks).

## Cách học với project này

1.  **Chuẩn bị Backend**: Dựng mock API bằng `json-server` như phần "Backend Setup" bên dưới. Đây là điều kiện cần để các async thunk hoạt động.
2.  **Cài đặt & chạy**: Cài dependencies (`npm install`) và chạy app (`npm run dev`).
3.  **Lần theo luồng dữ liệu**:
    - Bắt đầu tại `src/compenents/user.table.tsx`. Quan sát `useEffect` dispatch `fetchListUser()` khi component mount.
    - Mở Redux DevTools để thấy các action `users/fetchListUser/pending` và `users/fetchListUser/fulfilled`.
    - Click nút "Add New User" và theo dõi thunk `createNewUser` được dispatch từ modal, gọi API và sau đó lại dispatch `fetchListUser` để làm mới danh sách.
4.  **Thử nghiệm**: Sửa slice, thêm thuộc tính state mới, hoặc tạo slice mới để luyện tập.

---

## Thiết lập dự án

### Backend Setup (Bắt buộc)

Project cần một backend API. Có thể dùng `json-server` để dựng nhanh.

1.  **Cài `json-server`**: `npm install -g json-server`
2.  **Tạo `db.json`**: Tạo file `db.json` ở thư mục gốc dự án với nội dung:
    ```json
    { "users": [] }
    ```
3.  **Chạy server**: `json-server --watch db.json --port 8000`

### Frontend Setup

1.  **Cài dependencies**: `npm install`
2.  **Chạy ứng dụng**: `npm run dev`
