import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
const initiaUser = { password: "", email: "", username: "" };

export default function SignUp() {
  const [user, setUser] = useState(initiaUser);
  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((currentUser) => ({
      ...currentUser,
      [name]: value,
    }));
  };

  const handleSignUp = async () => {
    const url = `https://chat-app-limi.onrender.com/api/auth/local/register`;
    try {
      if (user.username && user.email && user.password) {
        const res = await axios.post(url, user);
        console.log({ res });
        toast.success("Registration successful", {
          hideProgressBar: true,
        });
        navigate('/')
      } else {
        toast.error("Please fill in all fields", {
          hideProgressBar: true, 
        });
      }
    } catch (error) {
      toast.error(error.message, {
        hideProgressBar: true,
      });
    }
  };

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">Sign Up</h1>
      <form className="flex flex-col gap-4">
        <input
          type="text"
          name="username"
          placeholder="username"
          value={user.username}
          onChange={handleChange}
          className="border p-3 rounded-lg"
          id="username"
        />
        <input
          type="text"
          name="email"
          placeholder="email"
          value={user.email}
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
          onClick={handleSignUp}
          className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
        >
          Sign Up
        </button>
      </form>
      <div className="flex gap-2 mt-5">
        <p>Have an account?</p>
        <Link to="/">
          <span className="text-blue-700"> sign-in</span>
        </Link>
      </div>
    </div>
  );
}
