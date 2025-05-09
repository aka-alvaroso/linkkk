import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "../components/Layout/Footer";
import Navbar from "../components/Layout/Navbar";

function DesktopLayout() {
  return (
    <div className="w-full min-h-screen flex flex-col items-center relative">
      <Navbar />
      <main className="w-full flex-1 flex flex-col bg-primary">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default DesktopLayout;
