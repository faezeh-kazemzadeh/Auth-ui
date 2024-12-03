import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { signIn as signInService , updateProfile as update } from "../../services/auth";
const initialState = {
  currentUser: null,
  error: null,
  isLoading: false,
};

export const signIn = createAsyncThunk(
  "auth/signin",
  async (credential, { rejectWithValue }) => {
    try {
      const data = await signInService(credential);
      console.log(data)
      return data;
    } catch (error) {
        if (error.response?.data) {
        return rejectWithValue(error.response.data || "Sign in failed");
      }
      return rejectWithValue("An unexpected error occurred");
    }
  }
);

export const updateProfile = createAsyncThunk(
  "auth/profile",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await update(credentials);
      return response;
    } catch (error) {    
      if (error.response && error.response.data) {
        
        return rejectWithValue(error.response.data || "Profile update failed");
      }
      return rejectWithValue("An unexpected error occurred");
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    signout: (state) => {
      (state.currentUser = null),
        (state.error = null),
        (state.isLoading = false);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signIn.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(signIn.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentUser = action.payload.user;
      })
      .addCase(signIn.rejected, (state, action) => {
        state.isLoading = false;
        state.currentUser = null;
        state.error = action.payload;
      })
      .addCase(updateProfile.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentUser = action.payload.user;
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.error = action.payload;
        state.isLoading = false;
      });
  },
});

export const {signout} = authSlice.actions;
export default authSlice.reducer;
