import { Link } from "@tanstack/react-router";
import cleanPlateLogo from "../assets/Clean Plate.png";

console.log("Logo path:", cleanPlateLogo);

export function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 bg-white z-50 shadow-sm">
      <nav className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <Link 
          to="/" 
          className="hover:opacity-80 transition-opacity"
        >
          <img 
            src={cleanPlateLogo}
            alt="Clean Plate Logo" 
            className="h-16 w-auto"
          />
        </Link>
        
        <div className="flex gap-6">
          {/* <Link 
            to="/" 
            className="text-[#37474F] hover:text-[#2E7D32] transition-colors"
          >
            Home
          </Link> */}
          <Link 
            to="/about" 
            className="text-[#37474F] hover:text-[#2E7D32] transition-colors"
          >
            About
          </Link>
          <Link 
            to="/blog" 
            className="text-[#37474F] hover:text-[#2E7D32] transition-colors"
          >
            Blog
          </Link>
        </div>
      </nav>
    </header>
  );
} 