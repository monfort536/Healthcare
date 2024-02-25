import React, { useEffect } from "react";
import "../styles/LayoutStyles.css";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { showLoading, hideLoading } from "../redux/features/alertSlice";
import axios from "axios";

const Layout = ({ children }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const getUserData = async () => {
    try {
       dispatch(showLoading());
      const res = await axios.post(
        "/api/user/getUserData",
        { token: localStorage.getItem("token") },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log("hideloading");
      dispatch(hideLoading());
      if (!res.data.success) {
        localStorage.clear();
        navigate("/login");
      }
    } catch (error) {
      localStorage.clear();
      dispatch(hideLoading());
      console.log(error);
    }
  };

  useEffect(() => {
    getUserData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Empty dependencies array to run only once

  return (
    <div className="main">
      {/* Your layout content */}
      {children}
    </div>
  );
};

export default Layout;
