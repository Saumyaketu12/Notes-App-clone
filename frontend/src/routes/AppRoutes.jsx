import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "../pages/Login";
import Register from "../pages/Register";
import NotesList from "../pages/NotesList";
import NoteDetail from "../pages/NoteDetail";
import PublicNote from "../pages/PublicNote";
import NotFound from "../pages/NotFound";
import RequireAuth from "./RequireAuth";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/s/:shareId" element={<PublicNote />} />
      <Route
        path="/notes/:id"
        element={
          <RequireAuth>
            <NoteDetail />
          </RequireAuth>
        }
      />
      <Route
        path="/"
        element={
          <RequireAuth>
            <NotesList />
          </RequireAuth>
        }
      />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
