import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
    ChevronLeft,
    ChevronRight,
    Home,
    LayoutDashboard,
    StickyNote,
    Calendar,
    Layers,
    Flag,
    Settings,
    LifeBuoy
} from "lucide-react";

const sidebarItems = [
    { icon: <Home size={20} />, text: "Home", to: "/" },
    { icon: <LayoutDashboard size={20} />, text: "Dashboard", to: "/dashboard" },
    { icon: <StickyNote size={20} />, text: "Research", to: "/research" },
    { icon: <Calendar size={20} />, text: "Portfolio", to: "/portfolio" },
    { icon: <Layers size={20} />, text: "News", to: "/research" },
    { icon: <Flag size={20} />, text: "MutualFunds", to: "/mutualRecommend" },
    { icon: <Settings size={20} />, text: "Settings", to: "/settings" },
    { icon: <LifeBuoy size={20} />, text: "Help", to: "/help" }
];

const Sidebar = () => {
    const [expanded, setExpanded] = useState(true);

    return (
        <nav className="h-auto bg-gray-900 text-white">
            <div className="p-4 flex justify-end ">
                <button
                    onClick={() => setExpanded(!expanded)}
                    className="p-1.5 rounded-lg bg-gray-800 hover:bg-gray-700"
                >
                    {expanded ? <ChevronLeft /> : <ChevronRight />}
                </button>
            </div>

            <ul className="mt-4">
                {sidebarItems.map((item, index) => (
                    <li key={index} className="mb-2">
                        <Link
                            to={item.to}
                            className="flex items-center px-4 py-2 hover:bg-gray-800"
                        >
                            {item.icon}
                            {expanded && <span className="ml-3">{item.text}</span>}
                        </Link>
                    </li>
                ))}
            </ul>
        </nav>
    );
};

export default Sidebar;