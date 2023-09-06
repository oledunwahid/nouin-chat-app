import { UserAuth } from "../context/AuthContext";
import Image1 from "../assets/Logout.png"
import Image2 from "../assets/Nouinchat.png"


const Navbar = () => {
  const {currentUser, logout} = UserAuth();

  const handleLogout = async () => {
    const confirmLogout = window.confirm("Are you sure you want to log out?");
  
    if (confirmLogout) {
      try {
        await logout();
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className="navbar fixed z-10 bg-accent text-neutral-content">
      <div className="containerWrap flex justify-between ">
      <img className=' w-[250px] group-hover:scale-125 transition-all duration-500' src={Image2} alt="" />
        {currentUser ?
        <img onClick={handleLogout} className=' w-[135px] hover:scale-105 transition-all duration-500' src={Image1} alt="" />: ""}
      </div>
    </div>
  );
};

export default Navbar;
