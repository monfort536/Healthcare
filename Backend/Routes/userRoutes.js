import express from "express";
import {
  addCake,
  createAccount,
  deleteCake,
  deleteuser,
  getAllCakes,
  getAllOrders,
  getAllOrdersWithoutStatus,
  getAllUsers,
  getMyOrders,
  getOrdersUsingStatus,
  placeOrder,
  updateCake,
  updateOrder,
  updateUser,
  userLogin
} from "../Controllers/userController.js";

const router = express.Router();
router.post("/createaccount", createAccount);
router.post("/addproduct", addCake);
router.post("/placeOrder", placeOrder);
router.get("/getCakes", getAllCakes);
router.get("/getusers", getAllUsers);
router.get("/userlogin/", userLogin);
router.get("/getMyOrders", getMyOrders);
router.get("/getordersusingstatus", getOrdersUsingStatus);
router.get("/getallorders", getAllOrders);
router.get("/getallorderswithoutstatus", getAllOrdersWithoutStatus);
router.delete("/deletecake/", deleteCake);
router.delete("/deleteuser/", deleteuser);
router.put("/updateproduct", updateCake);
router.put("/updateuser", updateUser);
router.put("/updateorder", updateOrder);

export default router;
