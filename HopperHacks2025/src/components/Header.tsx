import { Link } from "@tanstack/react-router";
import cleanPlateLogo from "../assets/Clean Plate.png";
import { Switch } from "./ui/switch";
import { useState, useEffect } from "react";

console.log("Logo path:", cleanPlateLogo);

export function Header() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // Add or remove dark class from document root
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  return (
    <header className="fixed top-0 left-0 right-0 bg-white dark:bg-gray-900 z-50 shadow-sm transition-colors duration-200">
      <nav className="px-4 md:px-6 h-20 flex items-center justify-between">
        <div className="flex items-center gap-2 md:gap-4">
          <Link 
            to="/" 
            className="hover:opacity-80 transition-opacity"
          >
            <img 
              src={cleanPlateLogo}
              alt="Clean Plate Logo" 
              className="h-12 md:h-16 w-auto"
            />
          </Link>

          <div className="flex items-center gap-1 md:gap-2">
            <span className="text-xs md:text-sm text-[#37474F] dark:text-gray-200">Light</span>
            <Switch
              checked={isDark}
              onCheckedChange={setIsDark}
              className="data-[state=checked]:bg-[#2E7D32]"
            />
            <span className="text-xs md:text-sm text-[#37474F] dark:text-gray-200">Dark</span>
          </div>
        </div>
        
        <div className="absolute left-1/2 transform -translate-x-1/2 hidden md:block">
          <p className="text-[#2E7D32] dark:text-[#4CAF50] text-lg font-semibold whitespace-nowrap">
            Empowering you with the truth behind every bite
          </p>
        </div>
        
        <div className="flex gap-3 md:gap-6">
          {/* <Link 
            to="/" 
            className="text-[#37474F] hover:text-[#2E7D32] transition-colors"
          >
            Home
          </Link> */}
          <Link 
            to="/about" 
            className="text-sm md:text-base text-[#37474F] dark:text-gray-200 hover:text-[#2E7D32] dark:hover:text-[#4CAF50] transition-colors"
          >
            About
          </Link>
          <Link 
            to="/blog" 
            className="text-sm md:text-base text-[#37474F] dark:text-gray-200 hover:text-[#2E7D32] dark:hover:text-[#4CAF50] transition-colors"
          >
            Blog
          </Link>
        </div>
      </nav>
    </header>
  );
} 