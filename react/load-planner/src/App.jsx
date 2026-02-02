import "./App.css";
import * as React from "react";
import { Box, IconButton, Tab, Tabs } from "@mui/material";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";

function TabPanel(props) {
  const { children, value, index, panelContentSx } = props;

  return (
    <Box hidden={value !== index}>
      {value === index && <Box sx={panelContentSx}>{children}</Box>}
    </Box>
  );
}

function TabPanelSidebar({ children, open }) {
  return (
    <Box
      sx={{
        paddingTop: 3,
        borderRight: "2px solid",
        borderColor: "divider",
        width: open ? 250 : 0,
        transition: (theme) =>
          theme.transitions.create("width", {
            duration: 300,
          }),
      }}
    >
      <Box
        sx={{
          opacity: open ? 1 : 0,
          whiteSpace: "nowrap",
          transition: (theme) =>
            theme.transitions.create("opacity", { duration: 300 }),
        }}
      >
        {children}
      </Box>
    </Box>
  );
}

function MainTabs() {
  const [selectedTab, setSelectedTab] = React.useState(0);
  const [isTabSidebarOpen, setIsTabSidebarOpen] = React.useState(true);

  const handleTabsOnChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  const handleTabSidebarClick = () => {
    setIsTabSidebarOpen(!isTabSidebarOpen);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs onChange={handleTabsOnChange} value={selectedTab}>
          <Tab label="Item One" />
          <Tab label="Item Two" />
          <Tab label="Item Three" />
        </Tabs>
      </Box>
      <TabPanel
        value={selectedTab}
        index={0}
        panelContentSx={{ display: "flex" }}
      >
        <TabPanelSidebar open={isTabSidebarOpen}>
          <Box>Sidebar Content</Box>
        </TabPanelSidebar>
        <Box sx={{ position: "relative", padding: 3 }}>
          <IconButton
            onClick={handleTabSidebarClick}
            color="primary"
            size="small"
            sx={{ position: "absolute", left: 0, top: 0 }}
          >
            {isTabSidebarOpen ? <ChevronLeft /> : <ChevronRight />}
          </IconButton>
          <Box>Main Content</Box>
        </Box>
      </TabPanel>
      <TabPanel value={selectedTab} index={1} panelContentSx={{ padding: 3 }}>
        Item Two
      </TabPanel>
      <TabPanel value={selectedTab} index={2} panelContentSx={{ padding: 3 }}>
        Item Three
      </TabPanel>
    </Box>
  );
}

function App() {
  return <MainTabs />;
}

export default App;
