import { useTabsContext } from "./context/TabsContext";

export function TabPanel({ children, id }) {
    const { activeTab } = useTabsContext();

    if (activeTab !== id) return null;
    else return <div className="tab-panel">{children}</div>
}