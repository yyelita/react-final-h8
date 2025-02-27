import { useState } from "react";
import { useNavigate } from "react-router";
import { z } from "zod";

const validUser = {
  name: "Admin",
  email: "admin@mail.com",
  password: "admin123",
};

const useAuth = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState({});
  const [error, setError] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const navigate = useNavigate();

  const login = (email: string, password: string) => {
    const schema = z.object({
      email: z.string().email("Email salah"),
      password: z.string().min(6, "Minimum password 6 karakter"),
    });

    const result = schema.safeParse({ email, password });

    if (!result.success) {
      const formattedError = Object.fromEntries(
        Object.entries(result.error.flatten().fieldErrors).map(
          ([key, value]) => {
            return [key, value?.[0] || ""];
          }
        )
      );

      setErrors(formattedError);
      return;
    }

    setErrors({});

    if (email !== validUser.email || password !== validUser.password) {
      setError("Invalid username or password");
      return;
    }

    setIsLoggedIn(true);
    setUser(validUser);
    localStorage.setItem("user", JSON.stringify(validUser));
    navigate("/", { replace: true });
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
    setIsLoggedIn,
    setEmail,
    setPassword,
  };
};

export default useAuth;
