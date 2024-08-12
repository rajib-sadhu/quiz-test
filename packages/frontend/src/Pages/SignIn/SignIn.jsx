import { FaGoogle } from "react-icons/fa";
import useAuth from "../../hooks/useAuth";
import { useLocation, useNavigate } from "react-router-dom";
import useAxiosSecure from "../../hooks/axiosSecure";
import toast from "react-hot-toast";

const SignIn = () => {
  const { signInWithGoogle } = useAuth();

  const [axiosSecure] = useAxiosSecure();

  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";

  const handleGoogle = async () => {
    signInWithGoogle()
      .then(async (result) => {
        const loggedInUser = result.user;
        const saveUser = {
          name: loggedInUser.displayName,
          email: loggedInUser.email,
        };

        try {
          const res = await axiosSecure.post(`/users/register`, saveUser);

          const data = res.data;

          if (data.message == "User email already exists.") {
            toast.success("User Logged In Successfully! 😀");
            navigate(from, { replace: true });
          }
          if (data.success) {
            toast.success("User Created Successfully! 😀");
            navigate(from, { replace: true });
          }
        } catch (error) {
          toast.error("Something is wrong, please try again");
          console.log("Google login server ERROR:", error);
        }
      })
      .catch((err) => {
        toast.error("Something is wrong, please try again");
        console.log("Google login firebase ERROR:", err);
      });
  };

  return (
    <div className="h-screen grid place-content-center">
      <div className="bg-red-300 md:w-/12 p-4 px-10 rounded-md">
        <h3 className="text-2xl font-medium">Sing in with google now!</h3>
        <div className="mt-4 flex justify-center">
          <button
            onClick={handleGoogle}
            className="flex items-center gap-2 text-xl bg-red-800 text-white px-4 pt-2 pb-3 rounded-md"
          >
            <FaGoogle className="" /> Google
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
