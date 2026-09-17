import { useNavigate } from "react-router";
import { baseURL } from '../config';
import { useForm } from "react-hook-form";
import type { UserNamespace } from "../Types/User";
import { joiResolver } from "@hookform/resolvers/joi";
import { loginScheme } from "../Schemas/UserScheme";

export const Login = () => {
  const {register, handleSubmit, formState:{errors}} = useForm<UserNamespace.loginRequest>({
    resolver : joiResolver(loginScheme)
  });
  const navigate = useNavigate();

  async function onSumbit(data: UserNamespace.loginRequest) {
  
    const response = await fetch(`${baseURL}user/login`, {
      method: "POST",
      headers: {
        Origin: window.location.host,
        "Content-type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (response.status != 200) {
      alert("Something went wrong!");
      return;
    }
    const Data = await response.json();
    localStorage.setItem("userData", JSON.stringify(Data));
    navigate("/home");
  }
  return (
    <div>
      <form onSubmit={handleSubmit(onSumbit)} className="h-65 w-60 border-2">
        <h3 className="bg-blue-500 text-1xl mb-4">Login User</h3>
        <div>
          <label>Email</label>
          <input
            {...register("email", {required:true})}
            placeholder="Enter your email"
            className="border-2 w-full"
          />
            {errors.email && <p className="text-red-700">{errors.email.message}</p>}

          <label>Password</label>
          <input
            {...register("password", {required:true})}
            placeholder="Enter your password"
            className="border-2 w-full"
          />
          {errors.password && <p className="text-red-700">{errors.password.message}</p>}

        </div>
        <span className="flex flex-row">
          <p>Don't have account ?</p>
          <button
            type="button"
            onClick={() => navigate("/")}
            className="text-blue-500"
          >
            Register
          </button>
        </span>
        <button
          type="submit"
          className="mx-auto h-7 w-30 bg-blue-600 rounded-lg text-white"
        >
          Login
        </button>
      </form>
    </div>
  );
};
