import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { setPage } from "../../../redux/pageSlice";
import { toast } from "react-hot-toast";

const IntegrationsPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const page = useSelector((state) => state.page);
  const user = useSelector((state) => state.user);

  const location = useLocation();
  const { ST_token } = location.state || {}; // Changed from accessToken to ST_token

  const getallpages = async () => {
    let LT_token = await axios.get(
      `https://graph.facebook.com/oauth/access_token?grant_type=fb_exchange_token&client_id=1688001311706061&client_secret=88008476667c380fa3e087fdb0ba1016&fb_exchange_token=${ST_token}`
    );

    const LT_acessToken = LT_token.data.access_token;
    const result = await axios.get(
      `https://graph.facebook.com/v17.0/me/accounts?access_token=${LT_acessToken}`
    );

    const page = {
      name: result.data.data[0].name,
      page_id: result.data.data[0].id,
      page_accessToken: result.data.data[0].access_token,
    };
    dispatch(setPage(page));
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token || (user.value.userId === null)) {
      navigate("/"); // Redirect to login if token or user is missing
      toast.error("Authorization Failed!");
      return;
    }
    getallpages();
  }, [user]);

  return (
    <div className="bg-blue-600 h-screen flex items-center justify-center">
      <div className="bg-white h-auto p-10 rounded-lg shadow-lg w-1/3  flex flex-col justify-between">
        <h1 className="text-center text-xl mb-4">Facebook Page Integration</h1>
        <div className="flex flex-col justify-center items-center">
          <h1 className=" font-bold">Page integrated : {page && page.value ? page.value.name : "Loading..."}</h1>

          <button className="bg-orange-700 text-white rounded-sm py-2 px-4 w-full mb-1">
            Delete Connection
          </button>

          <button
            className="bg-blue-900 text-white rounded-sm py-2 px-4 w-full"
            onClick={() => {
              navigate("/chatScreen");
            }}
          >
            Messege
          </button>
        </div>
      </div>
    </div>
  );
};

export default IntegrationsPage;
