import { MenuItem } from "@/@Types/sidebar";
import { FaTag, FaUsers } from "react-icons/fa";
import { MdOutlineSpaceDashboard, MdSubscriptions } from "react-icons/md";

  export const menuItems: MenuItem[] = [
    { 
      name: "Dashboard", 
      icon: <MdOutlineSpaceDashboard className="text-2xl text-white" />, 
      key: "dashboard",
      path: "/dashboard"
    },
    { 
      name: "Users", 
      icon: <FaUsers className="text-2xl text-white" />, 
      key: "users",
      path: "/users"
    },
    { 
      name: "Offers", 
      icon: <FaTag className="text-2xl text-white" />, 
      key: "offers",
      path: "/offers"
    },
    { 
      name: "Subscriptions", 
      icon: <MdSubscriptions className="text-2xl text-white" />, 
      key: "subscriptions",
      path: "/subscriptions"
    },
  ];