"use client";
import React, { useState } from "react";
import {
  MdOutlineSpaceDashboard,
  MdOutlineLogout,
  MdSubscriptions,
} from "react-icons/md";
import { FaTag, FaUsers } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoMdClose } from "react-icons/io";
import Image from "next/image";
import logo_light from "../../public/logo_light.webp";

type SidebarProps = {
  activeTab: string;
  setActiveTab: (tab: string) => void;
};

export default function Sidebar({ activeTab, setActiveTab }: SidebarProps) {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { name: "Dashboard", icon: <MdOutlineSpaceDashboard className="text-2xl text-white" />, key: "dashboard" },
    { name: "Users", icon: <FaUsers className="text-2xl text-white" />, key: "users" },
    { name: "Offers", icon: <FaTag className="text-2xl text-white" />, key: "offers" },
    { name: "Subscriptions", icon: <MdSubscriptions className="text-2xl text-white" />, key: "subscriptions" },
  ];

  return (
    <div className="flex">
      {/* Hamburger button (only on small/medium, hidden when sidebar open) */}
      {!isOpen && (
        <button
          className="md:hidden p-4 text-gray-600 fixed top-2 left-2 z-50 rounded-lg"
          onClick={() => setIsOpen(true)}
        >
          <GiHamburgerMenu className="text-2xl" />
        </button>
      )}

      {/* Overlay for mobile (click to close) */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed md:static top-0 left-0 h-screen w-72 bg-black/85 flex flex-col transform transition-transform duration-300 z-40
        ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
      >
        {/* Close button (mobile only) */}
        <div className="absolute top-4 right-4 md:hidden">
          <button onClick={() => setIsOpen(false)}>
            <IoMdClose className="text-3xl text-white" />
          </button>
        </div>

        {/* Logo section */}
        <div className="bg-white flex justify-center items-center p-5">
          <Image src={logo_light} alt="Logo" width={180} height={180} />
        </div>

        {/* Menu items */}
        <div className="flex-1 flex flex-col gap-4 p-5">
          {menuItems.map((item) => (
            <div
              key={item.key}
              onClick={() => {
                setActiveTab(item.key);
                setIsOpen(false); // close sidebar on mobile
              }}
              className={`flex items-center gap-4 p-4 rounded-2xl cursor-pointer hover:shadow-lg ${
                activeTab === item.key ? "bg-[#94e03e]/70" : "hover:bg-[#94e03e]/70"
              }`}
            >
              {item.icon}
              <span className="text-white font-semibold">{item.name}</span>
            </div>
          ))}
        </div>

        {/* Logout */}
        <div
          onClick={() => setIsOpen(false)}
          className="mt-auto flex items-center gap-4 p-4 rounded-2xl cursor-pointer hover:bg-[#94e03e]/70 mx-5 mb-5"
        >
          <MdOutlineLogout className="text-2xl text-white" />
          <span className="text-white font-semibold">Logout</span>
        </div>
      </div>
    </div>
  );
}
