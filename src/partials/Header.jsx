import React, { useState } from 'react';
import ThemeToggle from '../components/ThemeToggle';
import DropdownProfile from '../components/DropdownProfile';
import Notifications from '../components/DropdownNotifications';

import FullScreenButton from '../utils/FullScreen';
function Header({ sidebarOpen, setSidebarOpen }) {
  return (
    <header className="sticky top-0  bg-white dark:bg-[#182235] border-b border-slate-200 dark:border-slate-700 z-60">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 -mb-px">
          {/* Header: Left side */}
          <div className="flex">
            {/* Hamburger button */}
            <button
              className="text-slate-500 hover:text-slate-600 lg:hidden"
              aria-controls="sidebar"
              aria-expanded={sidebarOpen}
              onClick={(e) => {
                e.stopPropagation();
                setSidebarOpen(!sidebarOpen);
              }}
            >
              <span className="sr-only">Open sidebar</span>
              <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <rect x="4" y="5" width="16" height="2" />
                <rect x="4" y="11" width="16" height="2" />
                <rect x="4" y="17" width="16" height="2" />
              </svg>
            </button>
          </div>
          {/* Header: Right side */}
          <div className="flex items-center space-x-3">
            {/* <ThemeToggle /> */}
            <FullScreenButton />
            <Notifications align="right" />

            {/*  Divider */}
            <hr className="w-px h-6 bg-slate-200 dark:bg-slate-700 border-none" />
            {/* <UserMenu align="right" /> */}
            <DropdownProfile align="right" />

          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
