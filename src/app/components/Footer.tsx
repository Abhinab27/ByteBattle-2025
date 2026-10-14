

"use client";
import { Linkedin, Facebook, Instagram, X } from "lucide-react";
import ByteBattleLogo from "./ui/ByteBattleLogo";

const Footer: React.FC = () => {
  return (
    <footer className="relative w-full bg-gradient-to-br from-black/80 via-red-900/10 to-black/80 text-white py-16 px-6 border-t border-red-500/20 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        {/* Tech Grid Pattern */}
        <div className="absolute inset-0 opacity-5 bg-[radial-gradient(circle_at_25%_25%,rgba(255,0,0,0.1)_2px,transparent_2px),radial-gradient(circle_at_75%_75%,rgba(255,0,0,0.08)_1px,transparent_1px)] bg-[size:80px_80px,40px_40px]"></div>
        
        {/* Floating Tech Dots */}
        <div className="absolute top-8 left-[10%] w-1 h-1 bg-red-500 rounded-full animate-pulse opacity-60"></div>
        <div className="absolute top-16 right-[15%] w-1.5 h-1.5 bg-red-400 rounded-full animate-pulse opacity-50" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-12 left-[20%] w-2 h-2 bg-red-600 rounded-full animate-pulse opacity-40" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-8 right-[10%] w-1 h-1 bg-red-500 rounded-full animate-pulse opacity-70" style={{ animationDelay: '0.5s' }}></div>
        
        {/* Tech Lines */}
        <div className="absolute top-0 left-1/4 w-px h-20 bg-gradient-to-b from-red-500/30 to-transparent"></div>
        <div className="absolute top-0 right-1/3 w-px h-16 bg-gradient-to-b from-red-400/20 to-transparent"></div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Main Content */}
        <div className="flex flex-col lg:flex-row justify-between gap-12">
          {/* Left Part - Brand Section */}
          <div className="lg:w-1/2 space-y-6">
            {/* Logo and Title */}
            <div className="flex items-center space-x-4 group">
              <ByteBattleLogo />
              <div>
                <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-white to-red-200 bg-clip-text text-transparent">
                  BYTE BATTLE X NIT SILCHAR
                </h2>
                <p className="text-red-400 font-semibold">2026</p>
              </div>
            </div>
            
            <p className="text-gray-300 leading-relaxed max-w-lg">
              Join the ultimate 48-hour coding battlefield where innovation meets impact. 
              <span className="text-red-400 font-semibold"> ₹1L+ prizes</span>, 
              and endless possibilities await.
            </p>

            {/* Tech Stats */}
            <div className="flex flex-wrap gap-4 pt-4">
              <div className="flex items-center gap-2 px-3 py-2 bg-black/40 border border-red-500/20 rounded-lg backdrop-blur-sm">
                <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                <span className="text-sm text-red-300">48H Challenge</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-2 bg-black/40 border border-red-500/20 rounded-lg backdrop-blur-sm">
                <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
                <span className="text-sm text-red-300">Live Event</span>
              </div>
            </div>
          </div>

          {/* Right Part - Links Section */}
          <div className="lg:w-1/2 flex flex-col md:flex-row gap-12 justify-end">
            {/* Quick Links */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-red-100 flex items-center gap-2">
                <div className="w-1 h-6 bg-gradient-to-b from-red-400 to-red-600 rounded-full"></div>
                Quick Links
              </h3>
              <ul className="space-y-3">
                <li><a href="/" className="group flex items-center gap-2 text-gray-300 hover:text-red-400 transition-all">Home</a></li>
                <li><a href="/about" className="group flex items-center gap-2 text-gray-300 hover:text-red-400 transition-all">About</a></li>
                <li><a href="/contact" className="group flex items-center gap-2 text-gray-300 hover:text-red-400 transition-all">Contact</a></li>
                <li><a href="/admin/login" className="group flex items-center gap-2 text-red-400/90 hover:text-red-300 transition-all font-medium">Admin Portal</a></li>
              </ul>
            </div>

            {/* Social Links */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-red-100 flex items-center gap-2">
                <div className="w-1 h-6 bg-gradient-to-b from-red-400 to-red-600 rounded-full"></div>
                Connect With Us
              </h3>
              <ul className="space-y-3">
                <li><a href="https://x.com/BYTEBATTLEX" className="flex items-center gap-3 text-gray-300 hover:text-red-400 transition" target="_blank"><X className="w-4 h-4"/> X/Twitter</a></li>
                <li><a href="https://www.instagram.com/byte.battle.x.nits/" className="flex items-center gap-3 text-gray-300 hover:text-red-400 transition" target="_blank"><Instagram className="w-4 h-4"/> Instagram</a></li>
                <li><a href="#" className="flex items-center gap-3 text-gray-300 hover:text-red-400 transition" target="_blank"><Facebook className="w-4 h-4"/> Facebook</a></li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-red-500/20 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">

            <p className="text-gray-300 text-sm">
              © 2026 Byte Battle X NIT Silchar. All rights reserved.
            </p>

            
            <div className="flex items-center gap-6">
              <a href="/terms" className="text-sm text-gray-400 hover:text-red-400 transition">Terms</a>
              <a href="/privacy" className="text-sm text-gray-400 hover:text-red-400 transition">Privacy</a>
              <a href="/guidelines" className="text-sm text-gray-400 hover:text-red-400 transition">Guidelines</a>
            </div>

          </div>
        </div>
      </div>

      {/* Tech Corner Elements */}
      <div className="absolute bottom-0 left-0 w-16 h-px bg-gradient-to-r from-red-500/50 to-transparent"></div>
      <div className="absolute bottom-0 right-0 w-20 h-px bg-gradient-to-l from-red-500/50 to-transparent"></div>
    </footer>
  );
};

export default Footer;