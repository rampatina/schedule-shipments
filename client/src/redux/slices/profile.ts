import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Profile } from "../../types";
import { authService } from "../services/auth";
import { RootState } from "../store";

interface InitialState {
  profile: Profile | null;
  isError: boolean;
  isSuccess: boolean;
  isLoading: boolean;
  message: string;
}

const initialState: InitialState = {
  profile: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

//Get profile
export const getProfile = createAsyncThunk<Profile, void, { state: RootState }>(
  "auth/profile",
  async (profile, thunkApi): Promise<Profile> => {
    try {
      return await authService.profile(
        thunkApi.getState().auth.user?.token as string
      );
    } catch (err) {
      console.log(err);
      return {email: "", name: ""};
    }
  }
);

export const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    reset: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProfile.pending, (state) => {
        state.isLoading = true;
        state.message = "Loading profile...";
      })
      .addCase(getProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = "Successfully registered";
        state.profile = action.payload as Profile;
      })
      .addCase(getProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = (action.payload as string) || "Something went wrong";
        state.profile = null;
      })
  },
});