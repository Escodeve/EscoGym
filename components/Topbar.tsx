"use client";

import Link from "next/link";
import { UserCircleIcon } from "@heroicons/react/24/outline";
import { MdOutlineSettings } from "react-icons/md";

const Topbar: React.FC = () => {
  return (
    <header className="sticky top-0 z-50 flex justify-end items-center gap-2 sm:gap-4 p-4 bg-white w-full shadow-sm">
      {/* Settings */}
      <Link href="/settings/list" key="settings">
        <button className="relative p-2 rounded-full hover:bg-gray-100 transition-colors">
          <MdOutlineSettings className="text-2xl text-gray-600" />
          <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full" />
        </button>
      </Link>

      {/* User profile */}
      <Link href="/profile" key="profile">
        <button className="p-2 rounded-full hover:bg-gray-100 transition-colors">
          <UserCircleIcon className="w-8 h-8 text-gray-600" />
        </button>
      </Link>
    </header>
  );
};

export default Topbar;
