import mongoose, { Schema, Document } from "mongoose";

export interface IShipment extends Document {
  userid: string;
  itemname: string;
  quantity: number;
  address: string;
  phone: number;
  partnerid: string;
  status: string;
  orderdate: Date
}

const ShipmentSchema: Schema = new Schema(
  {
    userid: {
      type: String,
      required: [true, "Please add a user id"],
    },
    itemname: {
      type: String,
      required: [true, "Please add a item name"],
    },
    quantity: {
      type: Number,
      required: [true, "Please add a quantity"],
    },
    address: {
      type: String,
      required: [true, "Please add a item name"],
    },
    phone: {
      type: Number,
      required: [true, "Please add a phone number"],
    },
    partnerid: {
      type: String,
      required: [true, "Please add a partner id"],
    },
    status: {
      type: String,
      required: [true, "Please add a status"],
    },
    orderdate: {
        type: Date,
        required: [true, "Please add a date"],
    }
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IShipment>("Shipment", ShipmentSchema);
