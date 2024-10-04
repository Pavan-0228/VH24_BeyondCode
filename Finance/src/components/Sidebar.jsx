import { createContext, useContext, useState } from "react";
import { Link } from "react-router-dom";
import {
    ChevronFirst,
    ChevronLast,
    Home,
    LayoutDashboard,
    StickyNote,
    Layers,
    Flag,
    Calendar,
    LifeBuoy,
    Settings,
    MoreVertical
} from "lucide-react";
import profile from "../profile.png";

const SidebarContext = createContext();

export default function Sidebar() {
    const [expanded, setExpanded] = useState(true);

    return (
        <aside className="">
            <nav className="h-full flex flex-col bg-gray-900 border-r border-gray-700 shadow-sm">
                <div className="p-4 pb-2 flex justify-between items-center">
                    <button
                        onClick={() => setExpanded((curr) => !curr)}
                        className="p-1.5 rounded-lg bg-gray-800 hover:bg-gray-700"
                    >
                        {expanded ? <ChevronFirst className="text-gray-300" /> : <ChevronLast className="text-gray-300" />}
                    </button>
                </div>

                <SidebarContext.Provider value={{ expanded }}>
                    <ul className="flex-1 px-3">
                        <SidebarItem icon={<Home size={20} />} text="Home" to="/" alert />
                        <SidebarItem
                            icon={<LayoutDashboard size={20} />}
                            text="Dashboard"
                            to="/dashboard"
                            active
                        />
                        <SidebarItem
                            icon={<StickyNote size={20} />}
                            text="Projects"
                            to="/projects"
                            alert
                        />
                        <SidebarItem icon={<Calendar size={20} />} text="Portfolio" to="/calendar" />
                        <SidebarItem icon={<Layers size={20} />} text="news" to="/research" />
                        <SidebarItem icon={<Flag size={20} />} text="MutualFunds" to="/mutualfunds" />
                        <hr className="my-3 border-gray-700" />
                        <SidebarItem icon={<Settings size={20} />} text="Settings" to="/settings" />
                        <SidebarItem icon={<LifeBuoy size={20} />} text="Help" to="/help" />
                    </ul>
                </SidebarContext.Provider>

                <div className="border-t border-gray-700 flex p-3">
                    <img src={profile} className="w-10 h-10 rounded-md" alt="Profile" />
                    <div
                        className={`flex justify-between items-center overflow-hidden transition-all ${expanded ? "w-52 ml-3" : "w-0"
                            }`}
                    >
                        <div className="leading-4">
                            <h4 className="font-semibold text-gray-200">constGenius</h4>
                            <span className="text-xs text-gray-400">constgenius@gmail.com</span>
                        </div>
                        <MoreVertical size={20} className="text-gray-300" />
                    </div>
                </div>
            </nav>
        </aside>
    );
}

export function SidebarItem({ icon, text, to, active, alert }) {
    const { expanded } = useContext(SidebarContext);

    return (
        <li className={`relative flex items-center py-2 px-3 my-1 font-medium rounded-md cursor-pointer transition-colors group ${active
                ? "bg-gradient-to-tr from-indigo-800 to-indigo-900 text-indigo-100"
                : "hover:bg-gray-800 text-gray-300"
            }`}>
            <Link to={to} className="flex items-center w-full">
                <span className="text-gray-300">{icon}</span>
                <span className={`overflow-hidden transition-all ${expanded ? "w-52 ml-3" : "w-0"
                    }`}>
                    {text}
                </span>
                {alert && (
                    <div className={`absolute right-2 w-2 h-2 rounded bg-indigo-400 ${expanded ? "" : "top-2"
                        }`} />
                )}
            </Link>

            {!expanded && (
                <div className={`absolute left-full rounded-md px-2 py-1 ml-6 bg-gray-800 text-gray-100 text-sm invisible opacity-20 -translate-x-3 transition-all group-hover:visible group-hover:opacity-100 group-hover:translate-x-0`}>
                    {text}
                </div>
            )}
        </li>
    );
}