import { createSlice } from "@reduxjs/toolkit";

type User = {
  _id: string;
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  email: string;
  dob: string;
  role: string;
  loginId: string;
  section: string;
  lastActivity: string;
  totalActivity: string;
};

type AccountState = {
  currentUser: User | null;
};

const initialState: AccountState = {
  currentUser: null,
};
const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    setCurrentUser: (state, action: { payload: User | null }) => {
      state.currentUser = action.payload;
    },
  },
});
export const { setCurrentUser } = accountSlice.actions;
export default accountSlice.reducer;
