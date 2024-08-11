import { Link, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import toast from "react-hot-toast";
const Navbar = () => {
  const { user, logOut } = useAuth();

  const navigate = useNavigate();

  const handleLogOut = () => {
    logOut().then(() => {
      navigate("/");
      toast.success("Logout successfully!");
    });
  };

  return (
    <nav className="bg-red-950 text-white px-5 py-3 flex justify-between items-center">
      <h2 className="text-2xl font-bold">
        <Link to="/">Quiz Test</Link>
      </h2>
      <ul className="flex md:gap-5 gap-2 items-center font-medium capitalize text-sm">
        {user ? (
          <>
            <li className="text-xs">{user?.displayName}</li>
            {/* <li><img src={user?.photoURL} alt="User name" className="w-5 h-5 rounded-full border" /></li> */}
            <li>
              <button
                onClick={handleLogOut}
                className="bg-red-800 px-2 py-1 text-[10px] uppercase rounded-full"
              >
                out
              </button>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link
                className="bg-red-800 px-2 pt-1 pb-2 rounded-md"
                to={`/sign-in`}
              >
                Sign In
              </Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
