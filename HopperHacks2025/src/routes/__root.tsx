import { createRootRoute, Link, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { motion } from "framer-motion";

export const Route = createRootRoute({
  component: () => (
    <>
      <div className="p-4 bg-[#FAF3E0] flex justify-center items-center gap-8 absolute top-0 left-0 w-full animate-fadeDown">
        <Link 
          to="/" 
          className="[&.active]:font-bold text-[#37474F]/70 hover:text-[#37474F] hover:scale-110 transition-transform"
        >
          Home
        </Link>
        <Link 
          to="/about" 
          className="[&.active]:font-bold text-[#37474F]/70 hover:text-[#37474F] hover:scale-110 transition-transform"
        >
          About
        </Link>
        <Link 
          to="/results" 
          className="[&.active]:font-bold text-[#37474F]/70 hover:text-[#37474F] hover:scale-110 transition-transform"
        >
          Results
        </Link>
        <Link 
          to="/blog" 
          className="[&.active]:font-bold text-[#37474F]/70 hover:text-[#37474F] hover:scale-110 transition-transform"
        >
          Blog
        </Link>
      </div>
      <Outlet />
      <TanStackRouterDevtools />
    </>
  ),
});
