import { useContext } from "react";
import logo from "../assets/web-app-manifest.png";
import { useNavigate } from "react-router-dom";
import { AppContent } from "../context/AppContext";

const Navbar = () => {
  const navigate = useNavigate();
  const { userData } = useContext(AppContent);
  return (
    <nav className="absolute inset-x-0 top-0 z-10 flex w-full items-center justify-between p-4 sm:p-6 sm:px-24 mb-10">
      <div className="flex items-center">
        <img src={logo} alt="" className="h-15 w-15 shrink-0" />
        <span className="ml-3 min-w-40 text-4xl font-bold tracking-wide text-black sm:min-w-56 sm:text-3xl">
          Auth
        </span>
      </div>
      {userData ? (
        <div className="w-8 h-8 flex justify-center items-center rounded-full bg-black text-white  relative group">
          {userData.name[0].toUpperCase()}
          <div className="absolute hidden group-hover:block top-0 right-0 z-10 text-black rounded pt-10">
            <ul className="list-none m-0 p-2 bg-gray-100 text-sm">
              {!userData.isAccountVerified && <li className="py-1 px-2 hover:bg-gray-200 cursor-pointer">Verify Email</li>}    
              <li className="py-1 px-2 hover:bg-gray-200 cursor-pointer pr-10">Logout</li>
            </ul>
          </div>
        </div>
      ) : (
        <button
          onClick={() => navigate("/login")}
          className="flex items-center gap-2 rounded-full border border-gray-500 px-4 py-2 text-black hover:bg-white/10"
        >
          Login <span aria-hidden="true">→</span>
        </button>
      )}
    </nav>
  );
};

export default Navbar;
