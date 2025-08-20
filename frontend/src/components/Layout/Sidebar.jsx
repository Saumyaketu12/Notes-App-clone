import React from 'react';
import { NavLink } from 'react-router-dom';
import { FiPlus, FiStar, FiArchive, FiSettings } from 'react-icons/fi';

const Item = ({ to, icon: Icon, children }) => (
  <NavLink to={to} className={({ isActive }) => `flex items-center gap-2 px-3 py-2 rounded-md text-sm ${isActive ? 'bg-gray-100 dark:bg-white/5 font-medium' : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-white/3'}`}>
    <Icon className="text-lg" />
    <span>{children}</span>
  </NavLink>
);

export default function Sidebar(){
  return (
    <aside className="w-64 bg-white dark:bg-card border-r p-4 hidden md:block">
      <div className="mb-6">
        <div className="text-xs text-gray-500 mb-2">Quick</div>
        <Item to="/create" icon={FiPlus}>Create note</Item>
      </div>

      <nav className="space-y-1">
        <Item to="/" icon={FiStar}>All notes</Item>
        <Item to="/starred" icon={FiStar}>Starred</Item>
        <Item to="/archive" icon={FiArchive}>Archive</Item>
        <Item to="/settings" icon={FiSettings}>Settings</Item>
      </nav>

      <div className="mt-6 text-xs text-gray-500">Tips: Press <span className="font-medium">N</span> to create note</div>
    </aside>
  );
}
