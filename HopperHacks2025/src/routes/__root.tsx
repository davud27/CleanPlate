import { createRootRoute, Link, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";

export const Route = createRootRoute({
  component: () => (
    <>
      <div className="p-4 bg-[#FAF3E0] flex justify-center items-center gap-8 absolute top-0 left-0 w-full">
        <Link 
          to="/" 
          className="[&.active]:font-bold text-[#37474F]/70 hover:text-[#37474F]"
        >
          Home
        </Link>
        <Link 
          to="/about" 
          className="[&.active]:font-bold text-[#37474F]/70 hover:text-[#37474F]"
        >
          About
        </Link>
        <Link 
          to="/results" 
          className="[&.active]:font-bold text-[#37474F]/70 hover:text-[#37474F]"
        >
          Results
        </Link>
        <Link 
          to="/blog" 
          className="[&.active]:font-bold text-[#37474F]/70 hover:text-[#37474F]"
        >
          Blog
        </Link>
      </div>
      <Outlet />
      <TanStackRouterDevtools />
    </>
  ),
});
