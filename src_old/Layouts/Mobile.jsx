import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Layout/Navbar";
import Footer from "../components/Layout/Footer";

function MobileLayout() {
  return (
    <div className="w-full min-h-screen flex flex-col items-center relative">
      <Navbar />
      <main className="w-full h-screen pb-32 bg-primary">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default MobileLayout;
