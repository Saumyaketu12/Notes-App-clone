// src/components/Auth/LoginForm.jsx

import React, { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [hasError, setHasError] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    const r = await login(email, password);
    if (r === true) {
      navigate("/");
    } else {
      setHasError(true);
      setTimeout(() => setHasError(false), 500);
    }
  };

  return (
    <form
      onSubmit={submit}
      className={`max-w-md mx-auto bg-card p-6 rounded shadow bg-[var(--color-bg-card)] ${hasError? 'animate-shake' : ''}`}
    >
      <h2 className="text-2xl mb-4 text-[var(--color-text-primary)]">Sign in</h2>
      <label className="block mb-2 text-[var(--color-text-primary)]">
        Email
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mt-1 w-full border rounded p-2 bg-[var(--color-bg-input)]"
        />
      </label>
      <label className="block mb-4 text-[var(--color-text-primary)]">
        Password
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mt-1 w-full border rounded p-2 bg-[var(--color-bg-input)]"
        />
      </label>
      <div className="flex justify-between items-center">
        <button className="bg-[var(--color-accent-blue)] text-white px-4 py-2 rounded transition-transform transform hover:scale-105">
          Sign in
        </button>
        <a className="text-sm text-[var(--color-text-link)]" href="/register">
          Register
        </a>
      </div>
    </form>
  );
}