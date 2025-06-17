import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Folder, House, Link, Plus, Tag } from "lucide-react";
import Button from "../Common/Button";

export default function Footer() {
  const navigate = useNavigate();
  const [active, setActive] = useState("home");

  return (
    <div className="fixed bottom-5 w-72 flex items-center justify-between py-2.5 px-4 bg-navy border-2 border-yellow border-dashed rounded-2xl z-1000 backdrop-blur-sm mx-auto lg:hidden">
      <Button
        onClick={() => {
          navigate("/");
          setActive("home");
        }}
        variant="custom"
        size="md"
        className={`flex items-center hover:cursor-pointer ${
          active === "home" ? "text-yellow" : "text-white"
        }`}
      >
        <House size={25} />
      </Button>
      <Button
        onClick={() => {
          navigate("/links");
          setActive("links");
        }}
        variant="custom"
        size="md"
        className={`flex items-center hover:cursor-pointer ${
          active === "links" ? "text-yellow" : "text-white"
        }`}
      >
        <Link size={25} />
      </Button>

      <Button
        onClick={() => {
          navigate("/links/create");
          setActive("create");
        }}
        variant="yellow"
        size="md"
      >
        <Plus size={25} />
      </Button>
      <Button
        onClick={() => {
          navigate("/groups");
          setActive("groups");
        }}
        variant="custom"
        size="md"
        className={`flex items-center hover:cursor-pointer ${
          active === "groups" ? "text-yellow" : "text-white"
        }`}
      >
        <Folder size={25} />
      </Button>
      <Button
        onClick={() => {
          navigate("/tags");
          setActive("tags");
        }}
        variant="custom"
        size="md"
        className={`flex items-center hover:cursor-pointer ${
          active === "tags" ? "text-yellow" : "text-white"
        }`}
      >
        <Tag size={25} />
      </Button>
    </div>
  );
}
