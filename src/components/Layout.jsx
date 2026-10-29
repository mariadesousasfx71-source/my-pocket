import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

// The shared layout: the centred panel and the Navbar are drawn once,
// and only the page inside <Outlet /> changes as you move around.
function Layout() {
  return (
    <div className="max-w-6xl mx-auto min-h-screen sm:min-h-[calc(100vh-4rem)] bg-[#FBF6EF]/70 sm:rounded-2xl overflow-hidden border border-[#CFA97A] shadow-2xl">
      <Navbar />
      <main className="px-4 py-6 sm:p-8">
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;
