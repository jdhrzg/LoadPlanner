import { useTabsContext } from "./context/TabsContext";

export function TabPanel({ id, children }) {
    const { activeTab } = useTabsContext();

    if (activeTab !== id) return null;
    else return <div className="tab-panel">{children}</div>
}