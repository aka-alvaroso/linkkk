import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function MobileLayout() {
  return (
    <div className="max-w-full min-h-screen flex flex-col items-center relative">
      <Navbar />
      <main className="max-w-full pb-24 bg-primary">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default MobileLayout;
