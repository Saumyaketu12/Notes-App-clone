import React, { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();
  const submit = async (e) => {
    e.preventDefault();
    const r = await login(email, password);
    if (r === true) navigate("/");
    else alert(r.error || "Login failed");
  };
  return (
    <form
      onSubmit={submit}
      className="max-w-md mx-auto bg-white p-6 rounded shadow"
    >
      <h2 className="text-2xl mb-4">Sign in</h2>
      <label className="block mb-2">
        Email
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mt-1 w-full border rounded p-2"
        />
      </label>
      <label className="block mb-4">
        Password
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mt-1 w-full border rounded p-2"
        />
      </label>
      <div className="flex justify-between items-center">
        <button className="bg-blue-600 text-white px-4 py-2 rounded">
          Sign in
        </button>
        <a className="text-sm text-blue-600" href="/register">
          Register
        </a>
      </div>
    </form>
  );
}
