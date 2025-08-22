// src/pages/Register.jsx

import React from "react";
import RegisterForm from "../components/Auth/RegisterForm";
import Header from "../components/Layout/Header";
import Footer from "../components/Layout/Footer";

export default function Register() {
  return (
    <div className="min-h-screen p-6 flex flex-col">
      <Header />
      <main className="flex-1 flex items-center justify-center">
        <RegisterForm />
      </main>
      <Footer />
    </div>
  );
}