import "./App.css";
import { Tab } from "./Tabs/Tab";
import { TabList } from "./Tabs/TabList";
import { TabPanel } from "./Tabs/TabPanel";
import { TabPanels } from "./Tabs/TabPanels";
import { Tabs } from "./Tabs/Tabs";

function App() {
  return (
    <>
      <Tabs defaultTab="Tab1">
        <TabList>
          <Tab id="Tab1">Tab 1</Tab>
          <Tab id="Tab2">Tab 2</Tab>
          <Tab id="Tab3">Tab 3</Tab>
        </TabList>

        <TabPanels>
          <TabPanel id="Tab1">
            <h3>Tab 1 stuff here</h3>
          </TabPanel>
          <TabPanel id="Tab2">
            <h3>Tab 2 stuff here</h3>
          </TabPanel>
          <TabPanel id="Tab3">
            <h3>Tab 3 stuff here</h3>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </>
  );
}

export default App;
