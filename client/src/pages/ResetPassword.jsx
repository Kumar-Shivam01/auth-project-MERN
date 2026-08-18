import logo from "../assets/web-app-manifest.png";
import { useNavigate } from "react-router-dom";

const ResetPassword = () => {
  const navigate = useNavigate();
  return (
    <div className="flex items-center justify-center min-h-screen px-6 sm:px-0 bg-linear-to-br  from-white to-blue-400">
      <div className="absolute left-5 top-5 flex items-center sm:left-20">
        <img
          src={logo}
          onClick={() => navigate("/")}
          alt="Auth logo"
          className="h-15 w-15 shrink-0 cursor-pointer"
        />
        <span
          onClick={() => navigate("/")}
          className=" cursor-pointer ml-3 min-w-40 text-4xl font-bold tracking-wide text-black sm:min-w-56 sm:text-3xl"
        >
          Auth
        </span>
      </div>
      <form className="bg-slate-900 p-8 rounded-lg w-96 text-sm">
        <h1 className="text-white text-2xl font-semibold text-center mb-4">
          Reset Password
        </h1>
        <p className="text-center mb-6 text-indigo-300">
          Enter your registered Email address.
        </p>
        <div className="mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C]">
          <span>📩</span>
          <input type="email" placeholder="Email id" className="bg-transparent outline-none text-white"/>
        </div>
      </form>
    </div>
  );
};

export default ResetPassword;
