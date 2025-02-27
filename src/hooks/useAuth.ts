import { useState } from "react";
import { useNavigate } from "react-router"; // ✅ Fix import
import { z } from "zod";

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

  const login = (email: string, password: string) => {
    const schema = z.object({
      email: z.string().email("Invalid email"),
      password: z.string().min(6, "Password must be at least 6 characters"),
    });

    const result = schema.safeParse({ email, password });

    if (!result.success) {
      const formattedError = Object.fromEntries(
        Object.entries(result.error.flatten().fieldErrors).map(
          ([key, value]) => [key, value?.[0] || ""]
        )
      );
      setErrors(formattedError);
      return;
    }

    setErrors({});

    // ✅ Check `localStorage` for users
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const foundUser = users.find(
      (u: { email: string; password: string }) =>
        u.email === email && u.password === password
    );

    if (!foundUser) {
      setError("Invalid email or password");
      return;
    }

    setIsLoggedIn(true);
    setUser(foundUser);
    localStorage.setItem("user", JSON.stringify(foundUser));
    navigate("/", { replace: true });
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
