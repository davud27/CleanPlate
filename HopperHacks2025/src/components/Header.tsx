import { Link } from "@tanstack/react-router";
import cleanPlateLogo from "../assets/Clean Plate.png";

console.log("Logo path:", cleanPlateLogo);

export function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 bg-white z-50 shadow-sm">
      <nav className="px-6 h-20 flex items-center justify-between">
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
        
        <div className="absolute left-1/2 transform -translate-x-1/2">
          <p className="text-[#2E7D32] text-lg font-semibold whitespace-nowrap">
            Empowering You With The Truth Behind Every Bite
          </p>
        </div>
        
        <div className="flex gap-6 mr-6">
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