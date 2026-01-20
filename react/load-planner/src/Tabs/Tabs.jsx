import "./Tabs.css";
import { useState } from "react";
import { TabsContext } from "./context/TabsContext";

export function Tabs({ children, defaultTab }) {
    const [activeTab, setActiveTab] = useState(defaultTab);

    return (
        <TabsContext.Provider value={{ activeTab, setActiveTab }}>
            <div className="tabs">{children}</div>
        </TabsContext.Provider>
    );
} 