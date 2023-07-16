import { createSlice } from "@reduxjs/toolkit";
import { AppState } from "./store";
import { HYDRATE } from "next-redux-wrapper";

// Type for our state
export interface AuthState {
  authState: boolean;
  user: any;
  docTitle: string;
  isNewDoc: boolean;
  showAutoSaving: boolean;
}

// Initial state
const initialState: AuthState = {
  authState: false,
  user: {},
  docTitle: "",
  isNewDoc: false,
  showAutoSaving: false,
};

// Actual Slice
export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // Action to set the authentication status
    setAuthState(state, action) {
      state.authState = action.payload;
    },
    setUser(state, action) {
      state.user = action.payload;
    },
    setDocTitle(state, action) {
      state.docTitle = action.payload;
    },
    setIsNewDoc(state, action) {
      state.isNewDoc = action.payload;
    },
    setShowAutoSaving(state, action) {
      state.showAutoSaving = action.payload;
    },
  },

  // Special reducer for hydrating the state. Special case for next-redux-wrapper
  extraReducers: {
    [HYDRATE]: (state, action) => {
      return {
        ...state,
        ...action.payload.auth,
      };
    },
  },
});

export const { setAuthState, setUser, setDocTitle, setIsNewDoc, setShowAutoSaving } = authSlice.actions;
export const selectAuthState = (state: AppState) => state.auth.authState;
export const selectUser = (state: AppState) => state.auth.user;
export const selectDocTitle = (state: AppState) => state.auth.docTitle;
export const selectIsNewDoc = (state: AppState) => state.auth.isNewDoc;
export const selectShowAutoSaving = (state: AppState) => state.auth.showAutoSaving;
export default authSlice.reducer;
