import { createRootRoute, Outlet } from "@tanstack/react-router";
import { Header } from "../components/Header";

export const Route = createRootRoute({
  component: () => (
    <div className="min-h-screen bg-[#FAF3E0] dark:bg-gray-900 transition-colors duration-200">
      <Header />
      <Outlet />
    </div>
  ),
});
