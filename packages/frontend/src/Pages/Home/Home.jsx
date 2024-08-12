import { Link } from "react-router-dom";
import { FaPlusCircle } from "react-icons/fa";

const Home = () => {
  return (
    <div className="h-screen grid place-content-center">
      <div className="p-4 bg-red-200 flex flex-col items-center gap-4 text-white text-center">
        <Link to={`/create-test`} className="px-4 py-2 bg-red-800 rounded-md flex items-center gap-1" ><FaPlusCircle /> Create your test</Link>
        <Link to={`/join-test`} className="px-4 py-2 bg-red-800 rounded-md" >Start your test</Link>
      </div>
    </div>
  );
};

export default Home;
