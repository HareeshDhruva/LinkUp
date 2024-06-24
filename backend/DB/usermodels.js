import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  fullname: {
    type: String,
    require: true,
  },
  username: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
    unique: true,
  },
  phone: {
    type: Number,
    require: true,
    unique: true,
  },
  password: {
    type: String,
    require: true,
    min: 6,
  },
  gender: {
    type: String,
  }
},{timestamps:true});

export const User = mongoose.model("User",userSchema);

