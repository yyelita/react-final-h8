import { useForm } from "react-hook-form";
import { NavLink, useNavigate } from "react-router"; // ✅ Fix import

interface RegisterData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export default function Register() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<RegisterData>();

  function registerUser(data: RegisterData) {
    //  Remove confirmPassword before saving
    const { confirmPassword, ...userData } = data;

    //  Check if user already exists
    const existingUsers = JSON.parse(localStorage.getItem("users") || "[]");
    const userExists = existingUsers.some(
      (user: RegisterData) => user.email === data.email
    );

    if (userExists) {
      alert("Email is already registered!");
      return;
    }

    localStorage.setItem("users", JSON.stringify([...existingUsers, userData]));

    alert("Registration successful!");
    navigate("/login");
  }

  return (
    <div className="flex justify-center items-center h-screen bg-slate-100">
      <form
        onSubmit={handleSubmit(registerUser)}
        className="flex flex-col gap-4 bg-white p-8 w-[350px] rounded-lg shadow-lg"
      >
        <h1 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Register
        </h1>

        {/* Name Field */}
        <div className="flex flex-col gap-1  text-sm font-medium text-gray-700">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
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
        <div className="flex flex-col gap-1 text-sm font-medium text-gray-700">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            className="appearance-none w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
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
        <div className="flex flex-col gap-1 text-sm font-medium text-gray-700">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            className="appearance-none flex w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
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
        <div className="flex flex-col gap-1  text-sm font-medium text-gray-700">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            className="appearance-none flex w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
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
        <button className="mt-4 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-800">
          Register
        </button>

        {/* Login Link */}
        <div className="text-sm text-center">
          <p className="font-medium">
            Have an account?{" "}
            <NavLink to="/login" className="text-blue-500 underline">
              Login
            </NavLink>
          </p>
        </div>
      </form>
    </div>
  );
}
