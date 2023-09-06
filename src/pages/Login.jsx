import { useEffect, useState } from "react";
import { UserAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Image2 from "../assets/bg-giphy.gif"
import Image3 from "../assets/Welcome.png"
import Image4 from "../assets/Login.png"


const Login = () => {
  const navigate = useNavigate();
  const { currentUser, signinWithGoogle } = UserAuth();
  const [error, setError] = useState(null);

  const handleLogin = async () => {
    try {
      await signinWithGoogle();
    } catch (error) {
      setError("Error occurred during sign-in. Please try again.");
    }
  };

  useEffect(() => {
    if (currentUser) {
      navigate("/chat");
    }
  }, [currentUser, navigate]);

  return (
    <div className="hero min-h-screen flex flex-col items-center justify-center"
    style={{
      backgroundImage: `url(${Image2})`,
      backgroundSize: "cover",
    }}>
     
      <div className="hero-content text-center text-neutral-content">
        <div className="max-w-md  ">
          <div className="">
                <img className=' w-[300px]  transition-all duration-500' src={Image3} alt="" />
                <img   onClick={handleLogin} className=' w-[300px] transition-all duration-500 hover:scale-95 ' src={Image4} alt="" />
          </div>
         
        </div>
      </div>
    </div>
  );
};

export default Login;
