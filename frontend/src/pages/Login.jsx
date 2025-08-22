// src/pages/Login.jsx

import React from "react";
import LoginForm from "../components/Auth/LoginForm";
import Header from "../components/Layout/Header";
import Footer from "../components/Layout/Footer";

export default function Login() {
  return (
    <div className="min-h-screen p-6 flex flex-col">
      <Header />
      <main className="flex-1 flex items-center justify-center">
        <LoginForm />
      </main>
      <Footer />
    </div>
  );
}