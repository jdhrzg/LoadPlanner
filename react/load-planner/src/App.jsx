import "./App.css";
import { Tab } from "./Tabs/Tab";
import { TabList } from "./Tabs/TabList";
import { TabPanel } from "./Tabs/TabPanel";
import { TabPanels } from "./Tabs/TabPanels";
import { Tabs } from "./Tabs/Tabs";

function App() {
  return (
    <>
      <Tabs defaultTab="profile">
        <TabList>
          <Tab id="profile">Profile</Tab>
          <Tab id="settings">Settings</Tab>
          <Tab id="billing">Billing</Tab>
        </TabList>

        <TabPanels>
          <TabPanel id="profile">
            
          </TabPanel>
          <TabPanel id="settings">
            
          </TabPanel>
          <TabPanel id="billing">
            
          </TabPanel>
        </TabPanels>
      </Tabs>
    </>
  );
}

export default App;
