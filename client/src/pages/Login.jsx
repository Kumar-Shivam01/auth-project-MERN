import { useState } from "react";
import logo from "../assets/web-app-manifest.png";
const Login = () => {
  const [state, setState] = useState("Sign Up");
  return (
    <div className="flex items-center justify-center min-h-screen px-6 sm:px-0 bg-linear-to-br  from-white to-blue-400">
      <div className="absolute left-5 top-5 flex items-center sm:left-20">
        <img src={logo} alt="Auth logo" className="h-15 w-15 shrink-0 cursor-pointer" />
        <span className="ml-3 min-w-40 text-4xl font-bold tracking-wide text-black sm:min-w-56 sm:text-3xl">Auth</span>
      </div>
      <div className="bg-slate-900 p-10 rounded-lg shadow-lg w-full sm:w-96 text-indigo-300 text-sm">
          <h2 className="text-3xl font-semibold text-white text-center mb-3">{state === 'Sign Up'? 'Create Account':'Login'}</h2>
          <p className=" text-center text-sm mb-6">{state === 'Sign Up'? 'Create your account':'Login to your account'}</p>
          <form>
            <div className="mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-cyan-950">
              <span>👤</span>
              <input className="bg-transparent outline-none" type="text"  placeholder="Full Name" required/>
            </div>
            <div className="mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-cyan-950">
              <span>📩</span>
              <input className="bg-transparent outline-none" type="email"  placeholder="Email id" required/>
            </div>
            <div className="mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-cyan-950">
              <span>🔐</span>
              <input className="bg-transparent outline-none" type="text"  placeholder="Password" required/>
            </div>
            <p className="mb-4 cursor-pointer text-indigo-500">Forgot Password?</p>
            <button className="w-full py-2.5 rounded-full bg-linear-to-br from-indigo-500 to-indigo-900 cursor-pointer text-white font-medium">{state}</button>
          </form>
          <p className="text-gray-400 text-center text-xs mt-4">Already have an account? <span className="text-blue-400 cursor-pointer underline">Login here</span></p>
          <p className="text-gray-400 text-center text-xs mt-4">Don't have an account? <span className="text-blue-400 cursor-pointer underline">Sign Up here</span></p>
      </div>
    </div>
  );
};

export default Login;
