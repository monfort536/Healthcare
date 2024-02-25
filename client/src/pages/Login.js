import React, { useState } from "react";
import "../styles/RegisterStyles.css";
import { Form, Input, message } from "antd";
import { useDispatch } from "react-redux";
import { showLoading, hideLoading } from "../redux/features/alertSlice";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [email, setemail] = useState('');
  const [password, setPassword] = useState('');
  const user = {
    email: email,
    password: password
  }
  const onFinishHandler = async (event) => {
    // event.preventDefault();
    console.log(user);
    try {
      dispatch(showLoading());
      console.log("bfr post");
      const res = await axios.post("http://localhost:8080/api/user/login", user);
      console.log("after post");
      dispatch(hideLoading());
      if (res.data.success) {
        localStorage.setItem("token", res.data.token);
        message.success("Login Successfully");
        if (res.data.isAdmin) {
          navigate("/admin/users").catch(err => console.error(err));
        } else {
          navigate("/admin/doctors").catch(err => console.error(err));
        }
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      dispatch(hideLoading());
      
      if (error.response) {
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
        message.error(error.response.data.message || "Server Error");
      } else if (error.request) {
        console.log(error.request);
        message.error("No response from server");
      } else {
        console.log("Error", error.message);
        message.error("Something went wrong");
      }
    }
  };
  
  
  return (
    <div className="form-container">
      <Form layout="vertical" onFinish={onFinishHandler} className="register-form">
        <h3 className="text-center">Login Form</h3>
        <Form.Item label="Email" name="email">
          <Input value={email} onChange={(e)=>setemail(e.target.value)} type="email" required />
        </Form.Item>
        <Form.Item label="Password" name="password">
          <Input value={password} onChange={(e)=>setPassword(e.target.value)} type="password" required />
        </Form.Item>
        <Link to="/register" className="m-2">
          Not a user? Register here
        </Link>
        <button className="btn btn-primary" type="submit">
          Login
        </button>
      </Form>
    </div>
  );
};

export default Login;
