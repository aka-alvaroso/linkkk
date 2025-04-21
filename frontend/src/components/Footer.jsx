import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Folder, House, Link, Plus, Tag } from "lucide-react";

export default function Footer() {
  const navigate = useNavigate();
  const [active, setActive] = useState("home");

  return (
    <div className="fixed bottom-5 w-72 flex items-center justify-between py-2.5 px-4 bg-white  rounded-4xl z-1000 backdrop-blur-sm mx-auto lg:hidden">
      <button
        className={`relative flex flex-col items-center text-zinc-400 hover:cursor-pointer before:content-[''] before:-bottom-1 before:rounded-4xl before:absolute before:w-full before:h-1 ${
          active === "home" ? "before:bg-amber-300" : "before:bg-transparent"
        } hover:before:bg-amber-100`}
        onClick={() => {
          navigate("/");
          setActive("home");
        }}
      >
        <House width={25} height={25} />
      </button>
      <button
        className={`relative flex flex-col items-center text-zinc-400 hover:cursor-pointer before:content-[''] before:-bottom-1 before:rounded-4xl before:absolute before:w-full before:h-1 ${
          active === "links" ? "before:bg-amber-300" : "before:bg-transparent"
        } hover:before:bg-amber-100`}
        onClick={() => {
          navigate("/links");
          setActive("links");
        }}
      >
        <Link width={25} height={25} />
      </button>
      <button
        className="flex flex-col items-center text-neutral-800 bg-amber-300 p-1 rounded-3xl hover:cursor-pointer transition hover:scale-110"
        onClick={() => navigate("/links/create")}
      >
        <Plus width={30} height={30} />
      </button>
      <button
        className={`relative flex flex-col items-center text-zinc-400 hover:cursor-pointer before:content-[''] before:-bottom-1 before:rounded-4xl before:absolute before:w-full before:h-1 ${
          active === "groups" ? "before:bg-amber-300" : "before:bg-transparent"
        } hover:before:bg-amber-100`}
        onClick={() => {
          navigate("/groups");
          setActive("groups");
        }}
      >
        <Folder width={25} height={25} />
      </button>
      <button
        className={`relative flex flex-col items-center text-zinc-400 hover:cursor-pointer before:content-[''] before:-bottom-1 before:rounded-4xl before:absolute before:w-full before:h-1 ${
          active === "tags" ? "before:bg-amber-300" : "before:bg-transparent"
        } hover:before:bg-amber-100`}
        onClick={() => {
          navigate("/tags");
          setActive("tags");
        }}
      >
        <Tag width={25} height={25} />
      </button>
    </div>
  );
}
