"use client";

import React, { useState } from "react";
import { Menu, X, Shield } from "lucide-react";
import ByteBattleLogo from "./ui/ByteBattleLogo";
import { SignInButton, SignOutButton, UserButton } from "@clerk/clerk-react";
import { Spinner } from "components/spinner";
import { useConvexAuth } from "convex/react";
import { SignedIn, SignedOut } from "@clerk/clerk-react";

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isAuthenticated, isLoading } = useConvexAuth(); 

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="flex justify-center fixed w-full mt-6 z-[9999] px-4">
      <nav className="flex justify-between items-center w-full max-w-7xl px-4 py-3 rounded-2xl shadow-lg backdrop-blur-md bg-black/40 border border-red-500/25 text-white z-50 transition-all duration-300 hover:border-red-500/40 hover:shadow-red-500/10">
        {/* Left Logo */}
        <a href="/" className="flex items-center space-x-3 group">
          <ByteBattleLogo 
            size={42} 
            className="transition-all duration-300 group-hover:scale-110 group-hover:rotate-6" 
          />
          <h1 className="text-xl font-bold tracking-wide bg-gradient-to-r from-white to-red-200 bg-clip-text text-transparent transition-all duration-300 group-hover:from-red-100 group-hover:to-white">
            Byte Battle
          </h1>
        </a>

        {/* Center Links - Desktop */}
        <div className="hidden lg:flex space-x-6 font-semibold text-sm uppercase">
          <a href="/" className="relative group px-3 py-2 transition-all duration-300 hover:text-red-400">
            <span className="relative z-10">Home</span>
            <div className="absolute inset-0 bg-gradient-to-r from-red-500/10 to-red-700/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-red-400 to-red-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
          </a>
          <a href="/about" className="relative group px-3 py-2 transition-all duration-300 hover:text-red-400">
            <span className="relative z-10">About</span>
            <div className="absolute inset-0 bg-gradient-to-r from-red-500/10 to-red-700/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-red-400 to-red-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
          </a>
          <a href="/events" className="relative group px-3 py-2 transition-all duration-300 hover:text-red-400">
            <span className="relative z-10">Rounds</span>
            <div className="absolute inset-0 bg-gradient-to-r from-red-500/10 to-red-700/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-red-400 to-red-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
          </a>
          <a href="/prizes" className="relative group px-3 py-2 transition-all duration-300 hover:text-red-400">
            <span className="relative z-10">Prizes</span>
            <div className="absolute inset-0 bg-gradient-to-r from-red-500/10 to-red-700/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-red-400 to-red-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
          </a>
          <a href="/contact" className="relative group px-3 py-2 transition-all duration-300 hover:text-red-400">
            <span className="relative z-10">Contact</span>
            <div className="absolute inset-0 bg-gradient-to-r from-red-500/10 to-red-700/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-red-400 to-red-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
          </a>
        </div>

        {/* Right Buttons - Desktop */}
        <div className="hidden lg:flex items-center space-x-3">
          {/* Admin Portal Button */}
          <a
            href="/admin/login"
            className="px-3.5 py-2 rounded-xl text-xs font-bold uppercase tracking-wider text-red-300 hover:text-white border border-red-500/40 bg-red-950/30 hover:bg-red-600/30 hover:border-red-400 transition-all duration-300 flex items-center gap-1.5 shadow-[0_0_12px_rgba(255,0,0,0.2)]"
            title="Admin Login & Management Portal"
          >
            <Shield size={14} className="text-red-400" />
            <span>Admin</span>
          </a>

          <SignedOut>
            <SignInButton mode="modal" forceRedirectUrl="/register">
              <button className="relative group px-4 py-2 border-2 border-red-500/40 rounded-xl font-bold bg-gradient-to-r from-red-500/10 to-red-700/10 text-red-200 hover:text-white transition-all duration-300 hover:border-red-400/60 hover:shadow-lg hover:shadow-red-500/20 hover:scale-105 overflow-hidden cursor-pointer text-sm">
                <span className="relative z-10">Register Now</span>
                <div className="absolute inset-0 bg-gradient-to-r from-red-500/20 to-red-700/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>
            </SignInButton>

            <SignInButton mode="modal">
              <button className="relative group px-4 py-2 border border-white/20 rounded-xl font-semibold text-white hover:text-red-200 transition-all duration-300 hover:border-red-500/40 hover:bg-red-500/10 cursor-pointer text-sm">
                <span className="relative z-10">Login</span>
                <div className="absolute inset-0 bg-gradient-to-r from-red-500/10 to-red-700/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>
            </SignInButton>
          </SignedOut>

          <SignedIn>
            <a href="/register">
              <button className="relative group px-4 py-2 border-2 border-red-500/40 rounded-xl font-bold bg-gradient-to-r from-red-500/10 to-red-700/10 text-red-200 hover:text-white transition-all duration-300 hover:border-red-400/60 hover:shadow-lg hover:shadow-red-500/20 hover:scale-105 overflow-hidden cursor-pointer text-sm">
                <span className="relative z-10">Register Team</span>
                <div className="absolute inset-0 bg-gradient-to-r from-red-500/20 to-red-700/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>
            </a>

            <SignOutButton>
              <button className="relative group px-3.5 py-2 border border-white/20 rounded-xl font-medium text-xs text-white hover:text-red-200 transition-all duration-300 hover:border-red-500/40 hover:bg-red-500/10 cursor-pointer">
                <span>Sign Out</span>
              </button>
            </SignOutButton>
            <UserButton afterSwitchSessionUrl="/" />
          </SignedIn>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={toggleMenu}
          className="lg:hidden relative group p-2 border border-red-500/40 rounded-lg hover:border-red-400/60 hover:bg-red-500/10 transition-all duration-300 cursor-pointer"
        >
          {isMenuOpen ? (
            <X className="w-6 h-6 text-red-400" />
          ) : (
            <Menu className="w-6 h-6 text-red-400" />
          )}
        </button>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="lg:hidden fixed inset-0 bg-black/70 backdrop-blur-md z-40" onClick={toggleMenu}>
          <div 
            className="absolute top-24 left-1/2 transform -translate-x-1/2 w-[90%] max-w-md bg-black/90 backdrop-blur-xl border border-red-500/30 rounded-3xl shadow-2xl p-6"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Mobile Navigation Links */}
            <div className="space-y-3">
              <a 
                href="/" 
                className="block py-2.5 px-4 rounded-xl hover:bg-red-500/10 text-white font-medium hover:text-red-400 transition"
                onClick={toggleMenu}
              >
                Home
              </a>
              <a 
                href="/about" 
                className="block py-2.5 px-4 rounded-xl hover:bg-red-500/10 text-white font-medium hover:text-red-400 transition"
                onClick={toggleMenu}
              >
                About
              </a>
              <a 
                href="/events" 
                className="block py-2.5 px-4 rounded-xl hover:bg-red-500/10 text-white font-medium hover:text-red-400 transition"
                onClick={toggleMenu}
              >
                Rounds
              </a>
              <a 
                href="/prizes" 
                className="block py-2.5 px-4 rounded-xl hover:bg-red-500/10 text-white font-medium hover:text-red-400 transition"
                onClick={toggleMenu}
              >
                Prizes
              </a>
              <a 
                href="/contact" 
                className="block py-2.5 px-4 rounded-xl hover:bg-red-500/10 text-white font-medium hover:text-red-400 transition"
                onClick={toggleMenu}
              >
                Contact
              </a>
            </div>

            {/* Mobile Buttons */}
            <div className="space-y-3 mt-6 pt-6 border-t border-red-500/20">
              <a href="/admin/login" className="block" onClick={toggleMenu}>
                <button className="w-full py-2.5 px-4 border border-red-500/40 rounded-xl font-bold text-red-300 bg-red-950/40 hover:bg-red-600/20 flex items-center justify-center gap-2 transition cursor-pointer text-sm">
                  <Shield size={16} />
                  <span>Admin Portal</span>
                </button>
              </a>

              <a href="/register" className="block" onClick={toggleMenu}>
                <button className="w-full py-3 px-4 border-2 border-red-500/40 rounded-xl font-bold bg-gradient-to-r from-red-600 to-red-500 text-white text-sm">
                  Register Team
                </button>
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;