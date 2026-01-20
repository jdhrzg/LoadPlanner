import "./Sidebar.css";
import { useState } from "react";

export function Sidebar({ children, defaultOpen = true }) {
    const [isOpen, setIsOpen] = useState(defaultOpen);

    return (
        <aside className={`sidebar ${isOpen ? "open" : "collapsed"}`}>
            <button 
                className="sidebar-toggle"
                onClick={() => setIsOpen((prev) => !prev)} // ???
            >
                {isOpen ? "<" : ">" }
            </button>

            {isOpen && (
                <div className="sidebar-content">
                    {children}
                </div>
            )}
        </aside>
    );
}