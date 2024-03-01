import asyncHandler from "express-async-handler";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import userData from "../Models/User.js";
import User from "../Models/User.js";
import Cake from "../Models/Cake.js";
import Order from "../Models/Order.js";

const saltRounds = 10;

const verifyJWT = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    res.send("we need a token, please give us next time");
  } else {
    jwt.verify(token, "jwt-Secret-key", (err, decoded) => {
      if (err) {
        res.json({ auth: false, message: "U failed to authenticated" });
      } else {
        next();
      }
    });
  }
};

const createAccount = asyncHandler(async (req, res) => {
  const { username, email, password, address, mobile } = req.body;
  bcrypt.hash(password, saltRounds, async (err, hash) => {
    if (err) {
      res.send(err);
    }
    const userdata = new User({
      username: username,
      email: email,
      password: hash,
      address: address,
      mobile: mobile
    });
    await userdata.save();
    res.json({
      status: 200,
      message: "Account Created Successfully"
    });
  });
});

const userLogin = asyncHandler(async (req, res) => {
  const { email, password } = req.query;
  const user = await userData.find({ email: email });
  if (user) {
    bcrypt.compare(password, user[0].password, (error, response) => {
      if (response) {
        const id = user[0]._id;
        const token = jwt.sign({ id }, "jwt-Secret-key", {
          expiresIn: "1d" //10 - 10 sec
        });
        res.cookie("token", token);
        return res.json({ auth: true, token: token, result: user });
      } else {
        return res.send({
          message: "Wrong username/password combination!"
        });
      }
    });
  } else {
    res.send({ auth: false, message: "no User exist." });
  }
});

const addCake = asyncHandler(async (req, res) => {
  const { cakeName, image, price, description, category } = req.body;

  const cakedata = new Cake({
    cakeName: cakeName,
    image: image,
    price: price,
    description: description,
    category: category
  });
  await cakedata.save();
  res.json({
    status: 200,
    message: "Cake Added Successfully"
  });
});

const placeOrder = asyncHandler(async (req, res) => {
  const {
    username,
    email,
    address,
    mobile,
    cakeName,
    image,
    quantity,
    amount,
    weight,
    flavour,
    basecolour,
    bordercolour,
    borderdesign,
    caketext,
    type,
    currentDate,
    orderStatus
  } = req.body;

  const orderdata = new Order({
    username: username,
    email: email,
    address: address,
    mobile: mobile,
    cakeName: cakeName,
    image: image,
    quantity: quantity,
    amount: amount,
    weight: weight,
    flavour: flavour,
    basecolour: basecolour,
    bordercolour: bordercolour,
    borderdesign: borderdesign,
    caketext: caketext,
    type: type,
    currentDate: currentDate,
    orderStatus: orderStatus
  });
  await orderdata.save();
  res.json({
    status: 200,
    message: "Order Placed Successfully"
  });
});

const getAllCakes = asyncHandler(async (req, res) => {
  const cakeData = await Cake.find({});
  res.status(200).send(cakeData);
});

const getAllUsers = asyncHandler(async (req, res) => {
  const userData = await User.find({});
  res.status(200).send(userData);
});

const getAllOrders = asyncHandler(async (req, res) => {
  const orderData = await Order.find({ orderStatus: "pending" });
  res.status(200).send(orderData);
});

const getAllOrdersWithoutStatus = asyncHandler(async (req, res) => {
  const orderData = await Order.find({});
  res.status(200).send(orderData);
});

const getMyOrders = asyncHandler(async (req, res) => {
  const { email } = req.query;
  const orderData = await Order.find({ email: email });
  res.status(200).send(orderData);
});

const getOrdersUsingStatus = asyncHandler(async (req, res) => {
  const { status } = req.query;
  const orderData = await Order.find({ orderStatus: status });
  res.status(200).send(orderData);
});

const deleteCake = asyncHandler(async (req, res) => {
  const { id } = req.query;
  console.log(req.query);
  await Cake.deleteOne({ _id: id });
  res.json({ status: 200 });
});

const deleteuser = asyncHandler(async (req, res) => {
  const { id } = req.query;
  console.log(req.query);
  await User.deleteOne({ _id: id });
  res.json({ status: 200 });
});

const updateCake = asyncHandler(async (req, res) => {
  const { id, cakeName, image, price, description, category } = req.body;
  console.log(req.query);
  await Cake.updateOne(
    { _id: id },
    {
      $set: {
        cakeName: cakeName,
        image: image,
        price: price,
        description: description,
        category: category
      }
    }
  );
  res.json({ status: 200, message: "Cake Updated Successfully" });
});

const updateUser = asyncHandler(async (req, res) => {
  const { id, username, email, password, address, mobile } = req.body;
  await User.updateOne(
    { _id: id },
    {
      $set: {
        username: username,
        email: email,
        password: password,
        address: address,
        mobile: mobile
      }
    }
  );
  res.json({ status: 200, message: "User Updated Successfully" });
});

const updateOrder = asyncHandler(async (req, res) => {
  const {
    id,
    username,
    email,
    address,
    mobile,
    cakeName,
    image,
    quantity,
    amount,
    currentDate
  } = req.body;
  console.log(req.body);
  await Order.updateOne(
    { _id: id },
    {
      $set: {
        username: username,
        email: email,
        address: address,
        mobile: mobile,
        cakeName: cakeName,
        image: image,
        quantity: quantity,
        amount: amount,
        currentDate: currentDate,
        orderStatus: "delivered"
      }
    }
  );
  res.json({ status: 200, message: "Order Updated Successfully" });
});

export {
  createAccount,
  userLogin,
  addCake,
  getAllCakes,
  placeOrder,
  getMyOrders,
  deleteCake,
  verifyJWT,
  updateCake,
  getAllUsers,
  updateUser,
  deleteuser,
  getAllOrders,
  updateOrder,
  getOrdersUsingStatus,
  getAllOrdersWithoutStatus
};
