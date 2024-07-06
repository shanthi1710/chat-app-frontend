import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import {useDispatch} from 'react-redux'
import { signInStart,signInSuccess,signInFailure } from "../../redux/user/userSlice";
const initiaUser = { identifier: "", password: ""};

export default function SignIn() {
  const [user, setUser] = useState(initiaUser);
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const handleChange = (e) => {  
    const { name, value } = e.target;
    setUser((currentUser) => ({
      ...currentUser,
      [name]: value,
    }));
  };

  const handleLogin = async () => {
    const url = `https://chat-app-limi.onrender.com/api/auth/local`;
    try {
      dispatch(signInStart())
      if (user.identifier && user.password) {  
        const res = await axios.post(url, user);
        console.log({ res });
        dispatch(signInSuccess(res.data.user))
        console.log(res.data.user)
        toast.success("Login successful", {
          hideProgressBar: true,
        });
        navigate("/user-chat");
      }
    } catch (error) {
      signInFailure(error.message)
      toast.error(error.message, {
        hideProgressBar: true,
      });
    }
  };

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">Sign In</h1>
      <form className="flex flex-col gap-4">
        <input
          type="text"
          name="identifier"  
          placeholder="email"
          value={user.identifier} 
          onChange={handleChange}
          className="border p-3 rounded-lg"
          id="email"
        />
        <input
          type="password"
          name="password"
          placeholder="password"
          className="border p-3 rounded-lg"
          id="password"
          value={user.password}
          onChange={handleChange}
        />
        <button
          type="button"  
          onClick={handleLogin}
          className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
        >
          Sign In
        </button>
      </form>
      <div className="flex gap-2 mt-5">
        <p>Have an account?</p>
        <Link to="/sign-up">
          <span className="text-blue-700"> sign-up</span>
        </Link>
      </div>
    </div>
  );
}
 