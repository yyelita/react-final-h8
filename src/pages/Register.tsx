import { useForm } from "react-hook-form";
import { NavLink } from "react-router"; // ✅ Fix import

interface RegisterData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export default function Register() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<RegisterData>(); // ✅ No more Zo

  function registerUser(data: RegisterData) {
    console.log(data);
    alert(JSON.stringify(data));
  }

  return (
    <div className="flex justify-center items-center h-screen bg-slate-100">
      <form
        onSubmit={handleSubmit(registerUser)}
        className="flex flex-col gap-4 bg-white p-8 w-[350px] rounded-lg shadow-lg"
      >
        <h1 className="text-3xl">Register</h1>

        {/* Name Field */}
        <div className="flex flex-col gap-1">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            placeholder="Name"
            className="border border-slate-200 py-1 px-3 rounded-md"
            {...register("name", {
              required: "Name is required",
              minLength: {
                value: 3,
                message: "Name must be at least 3 characters",
              },
            })}
          />
          {errors.name && (
            <p className="text-red-500 text-sm">{errors.name.message}</p>
          )}
        </div>

        {/* Email Field */}
        <div className="flex flex-col gap-1">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            placeholder="Email"
            className="border border-slate-200 py-1 px-3 rounded-md"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^\S+@\S+\.\S+$/,
                message: "Invalid email address",
              },
            })}
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email.message}</p>
          )}
        </div>

        {/* Password Field */}
        <div className="flex flex-col gap-1">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            placeholder="Password"
            className="border border-slate-200 py-1 px-3 rounded-md"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
              },
            })}
          />
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password.message}</p>
          )}
        </div>

        {/* Confirm Password Field */}
        <div className="flex flex-col gap-1">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            placeholder="Confirm Password"
            className="border border-slate-200 py-1 px-3 rounded-md"
            {...register("confirmPassword", {
              required: "Please confirm your password",
              validate: (value) =>
                value === watch("password") || "Passwords do not match",
            })}
          />
          {errors.confirmPassword && (
            <p className="text-red-500 text-sm">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        {/* Register Button */}
        <button className="mt-4 border border-blue-500 text-blue-500 py-1 px-3 rounded-md cursor-pointer">
          Register
        </button>

        {/* Login Link */}
        <div>
          <p className="mt-4 text-center">
            Have an account?{" "}
            <NavLink to="/login" className="text-blue-500">
              Login
            </NavLink>
          </p>
        </div>
      </form>
    </div>
  );
}
