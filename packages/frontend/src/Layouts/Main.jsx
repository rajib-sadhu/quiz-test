import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

const Main = () => {
  return (
    <div className="lg:w-[1080px] md:w-[760px] mx-auto">
       <Navbar/>
      <Outlet />
    </div>
  );
};

export default Main;
