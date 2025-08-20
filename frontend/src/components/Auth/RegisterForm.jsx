import React, { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
export default function RegisterForm() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const { register } = useAuth();
  const navigate = useNavigate();
  const submit = async (e) => {
    e.preventDefault();
    const r = await register(name, email, password);
    if (r === true) navigate("/");
    else alert(r.error || "Register failed");
  };
  return (
    <form
      onSubmit={submit}
      className="max-w-md mx-auto bg-white p-6 rounded shadow"
    >
      <h2 className="text-2xl mb-4">Create account</h2>
      <label className="block mb-2">
        Name
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mt-1 w-full border rounded p-2"
        />
      </label>
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
        <button className="bg-green-600 text-white px-4 py-2 rounded">
          Register
        </button>
        <a className="text-sm text-blue-600" href="/login">
          Sign in
        </a>
      </div>
    </form>
  );
}
