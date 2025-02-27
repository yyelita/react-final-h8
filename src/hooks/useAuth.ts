import { useState } from "react";
import { useNavigate } from "react-router"; // ✅ Fixed import
import { z } from "zod";

// ✅ Define login validation schema
const loginSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const useAuth = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("user"));
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user") || "{}")
  );
  const [error, setError] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const navigate = useNavigate();

  const login = (email: string, password: string): boolean => {
    const result = loginSchema.safeParse({ email, password });

    if (!result.success) {
      const formattedErrors = Object.fromEntries(
        Object.entries(result.error.flatten().fieldErrors).map(
          ([key, value]) => [key, value?.[0] || ""]
        )
      );
      setErrors(formattedErrors);
      return false; // ✅ Prevent login if validation fails
    }

    setErrors({}); // ✅ Clear errors

    // ✅ Check LocalStorage for registered users
    const users = JSON.parse(localStorage.getItem("users") || "[]");

    if (!Array.isArray(users)) {
      setError("No registered users found");
      return false;
    }

    const foundUser = users.find(
      (u: { email: string; password: string }) =>
        u.email === email && u.password === password
    );

    if (!foundUser) {
      setError("Invalid email or password");
      return false;
    }

    // ✅ Set login state & save user session
    setIsLoggedIn(true);
    setUser(foundUser);
    localStorage.setItem("user", JSON.stringify(foundUser));
    return true; // ✅ Return true when login is successful
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUser({});
    localStorage.removeItem("user");
    navigate("/login");
  };

  return {
    isLoggedIn,
    user,
    email,
    password,
    error,
    errors,
    setError,
    login,
    logout,
    setIsLoggedIn,
    setEmail,
    setPassword,
  };
};

export default useAuth;
