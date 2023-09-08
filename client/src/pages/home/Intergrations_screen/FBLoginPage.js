import React, { useEffect } from "react";
import { LoginSocialFacebook } from "reactjs-social-login";
import { FacebookLoginButton } from "react-social-login-buttons";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../../../redux/userSlice";

const FBLoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Add this useEffect to perform the authorization check
  useEffect(() => {
    const token = localStorage.getItem("token"); // Replace "token" with the actual key you use to store the token
    if (!token) {
      navigate("/"); // Redirect to login if no token found
    }
  }, [navigate]);

  return (
    <div className="bg-[#004E96] h-screen flex items-center justify-center font-sans">
      <div className="bg-white h-1/3 p-10 rounded-2xl shadow-lg w-1/3  flex flex-col justify-between">
        <h1 className="text-center text-xl mb-4">Facebook Page Integration</h1>
        <div className="flex flex-col justify-center items-center">
          <LoginSocialFacebook
            appId="1688001311706061"
            scope="email,public_profile,pages_show_list,pages_messaging"
            onResolve={(response) => {
              // Create a user object containing only the required fields
              const user = {
                name: response.data.name,
                email: response.data.email,
                userId: response.data.userID,
                picture: response.data.picture.data.url,
              };
              dispatch(setUser(user));
              const ST_token = response.data.accessToken;

              toast.success("Facebook Login Successfull");
              navigate("/integrations", { state: { ST_token } });
            }}
            onReject={(response) => {
              toast.error(response);
            }}
          >
            <FacebookLoginButton />
          </LoginSocialFacebook>
        </div>
      </div>
    </div>
  );
};

export default FBLoginPage;
