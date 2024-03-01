import mongoose from "mongoose";
const orderData = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  mobile: {
    type: String,
    required: true
  },
  cakeName: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  quantity: {
    type: String,
    required: true
  },
  amount: {
    type: String,
    required: true
  },
  weight: {
    type: String,
    required: false
  },
  flavour: {
    type: String,
    required: false
  },
  basecolour: {
    type: String,
    required: false
  },
  bordercolour: {
    type: String,
    required: false
  },
  borderdesign: {
    type: String,
    required: false
  },
  caketext: {
    type: String,
    required: false
  },
  type: {
    type: String,
    required: true
  },
  currentDate: {
    type: String,
    required: true
  },
  orderStatus: {
    type: String,
    required: true
  }
});
//userdetail is the modelname.using these userdetail we can able to create,read,update,delete datas in userdetails collection
const Order = mongoose.model("orders", orderData);

export default Order;
