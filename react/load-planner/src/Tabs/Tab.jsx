import { useTabsContext } from "./context/TabsContext";

export function Tab({ children, id }) {
    const { activeTab, setActiveTab } = useTabsContext();
    const isActive = activeTab === id;

    return (
        <button 
        className={`tab ${isActive ? "active" : ""}`}
        onClick={() => setActiveTab(id)}
        >
            {children}
        </button>
    );
}