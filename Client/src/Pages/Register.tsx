import { useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import type { UserNamespace } from "../Types/User";
import { joiResolver } from "@hookform/resolvers/joi";
import { registerSchema } from "../Schemas/UserScheme";
import { post } from "../Services/api";

export const Register = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserNamespace.RegisterRequest>({
    resolver: joiResolver(registerSchema),
  });

  async function onSubmit(obj: UserNamespace.RegisterRequest) {
    const response = await post("user/register", obj);
    if (!response.ok) {
      alert(`Error ${response.message}`);
      return;
    }
    navigate("/login");
  }
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="h-65 w-60 border-2">
        <h3 className="bg-blue-500 text-1xl mb-4">Register User</h3>
        <div>
          <label>Username</label>
          <input
            {...register("name", { required: true, maxLength: 20 })}
            placeholder="Enter your name"
            className="border-2 w-full"
          />
          {errors.name && <p className="text-red-700">{errors.name.message}</p>}

          <label>Email</label>
          <input
            {...register("email", { required: true })}
            placeholder="Enter your email"
            className="border-2 w-full"
          />
          {errors.email && (
            <p className="text-red-700">{errors.email.message}</p>
          )}

          <label>Password</label>
          <input
            {...register("password", { required: true })}
            placeholder="Enter your password"
            className="border-2 w-full"
          />
          {errors.password && <p>{errors.password.message}</p>}
        </div>
        <span className="flex flex-row">
          <p>Already have account ?</p>
          <button
            type="button"
            onClick={() => navigate("/login")}
            className="text-blue-500"
          >
            Login
          </button>
        </span>
        <button
          type="submit"
          className="mx-auto h-7 w-30 bg-blue-600 rounded-lg text-white"
        >
          Register
        </button>
      </form>
    </div>
  );
};
