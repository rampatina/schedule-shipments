import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Shipment } from "../../types";
import { shipmentServices } from "../services/shipments";
import { RootState } from "../store";

interface InitialState {
  shipments: Shipment[];
  isError: boolean;
  isSuccess: boolean;
  isLoading: boolean;
  message: string;
}

const initialState: InitialState = {
  shipments: [],
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: "",
};

export const getShipments = createAsyncThunk<Shipment[], void, { state: RootState }>(
  "shipments/getShipments",
  async (shipments, thunkApi): Promise<Shipment[]> => {
    try {
      return await shipmentServices.getShipments(
        thunkApi.getState().auth.user?.token as string
      );
    } catch (err) {
      console.log(err);
      return [];
    }
  }
);

export const createShipment = createAsyncThunk<
  Shipment,
  { itemname: string, quantity: number, address: string, phone: string, partnerid: string },
  { state: RootState }
>("shipments/createShipment", async ({ itemname, quantity, address, phone, partnerid}, thunkApi) => {
  const token = thunkApi.getState().auth.user?.token;
  try {
    thunkApi.rejectWithValue("Order placed");
    return await shipmentServices.createShipment({ itemname, quantity, address, phone, partnerid}, token as string);
  } catch (error: any) {
    console.log(error);
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkApi.rejectWithValue(message);
  }
});

export const shipmentsSlice = createSlice({
  name: "shipments",
  initialState,
  reducers: {
    reset: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getShipments.pending, (state) => {
        state.isLoading = true;
        state.message = "Loading Shipements...";
      })
      .addCase(getShipments.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.shipments = action.payload as Shipment[];
        state.message = "Shipments loaded successfully";
      })
      .addCase(getShipments.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = (action.payload as string) || "Something went wrong";
      })
      .addCase(createShipment.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createShipment.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.message = "Shipment created successfully";
        state.shipments.push(action.payload as Shipment);
      })
      .addCase(createShipment.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = (action.payload as string) || "Something went wrong";
      })
  },
});

export const { reset } = shipmentsSlice.actions;
