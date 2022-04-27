import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Partner } from "../../types";
import { shipmentServices } from "../services/shipments";
import { RootState } from "../store";

interface InitialState {
  partners: Partner[];
  isError: boolean;
  isSuccess: boolean;
  isLoading: boolean;
  message: string;
}

const initialState: InitialState = {
  partners: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

//Get partners
export const getPartners = createAsyncThunk<Partner[], void, { state: RootState }>(
  "shipments/getPartners",
  async (partners, thunkApi): Promise<Partner[]> => {
    try {
      return await shipmentServices.partners(
        thunkApi.getState().auth.user?.token as string
      );
    } catch (err) {
      console.log(err);
      return [];
    }
  }
);

export const partnersSlice = createSlice({
  name: "partners",
  initialState,
  reducers: {
    reset: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getPartners.pending, (state) => {
        state.isLoading = true;
        state.message = "Loading profile...";
      })
      .addCase(getPartners.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = "Successfully registered";
        state.partners = action.payload as Partner[];
      })
      .addCase(getPartners.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = (action.payload as string) || "Something went wrong";
        state.partners = [];
      })
  },
});