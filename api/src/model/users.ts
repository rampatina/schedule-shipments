import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  isPartner: boolean;
}

const UserSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Please add a name"],
    },
    email: {
      type: String,
      required: [true, "Please add a email"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Please add a password"],
    },
    isPartner: {
      type: Boolean,
    }
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IUser>("User", UserSchema);
