import "./App.css";
import * as React from "react";
import { 
  Add, 
  ChevronLeft, 
  ChevronRight, 
  Delete 
} from "@mui/icons-material";
import {
  Box,
  Card,
  IconButton,
  Tab,
  Tabs,
  TextField,
  Typography,
} from "@mui/material";

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

function ItemGroup({ group, onClickAddItemGroup }) {
  return (
    <Box>
      <Typography variant="h6">{group.name}</Typography>
      {group.items.map((item) => (
        <Item key={item.id} parentGroup={group} item={item} />
      ))}
      <IconButton onClick={onClickAddItemGroup}>
        <Add />
      </IconButton>
    </Box>
  );
}

function Item({ parentGroup, item }) {
  return (
    <Card
      variant="outlined"
      sx={{
        height: 200,
        display: "grid",
        gridTemplateColumns: "1fr auto",
        gridTemplateRows: "auto 1fr 1fr 1fr",
        alignItems: "center",
        padding: 1,
        margin: 1,
        "& .MuiTextField-root": { gridColumn: "span 2" },
        "& .MuiIconButton-root": { gridRow: 1, gridColumn: 2 },
      }}
    >
      <Typography variant="body1">{item.name}</Typography>
      <IconButton size="small">
        <Delete />
      </IconButton>
      <TextField
        label="Length"
        id={`length-${parentGroup.id}`}
        value={item.length}
        size="small"
        variant="outlined"
      />
      <TextField
        label="Width"
        id={`width-${parentGroup.id}`}
        value={item.width}
        size="small"
        variant="outlined"
      />
      <TextField
        label="Height"
        id={`height-${parentGroup.id}`}
        value={item.height}
        size="small"
        variant="outlined"
      />
    </Card>
  );
}

function App() {
  const [selectedTab, setSelectedTab] = React.useState(0);
  const [isTabSidebarOpen, setIsTabSidebarOpen] = React.useState(true);
  const [itemGroups, setItemGroups] = React.useState([
    {
      id: 1,
      name: "Group A",
      items: [
        { id: 1, name: "Box of Apples (M)", length: 10, width: 15, height: 20 },
      ],
    },
  ]);

  const handleTabsOnChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  const handleTabSidebarClick = () => {
    setIsTabSidebarOpen(!isTabSidebarOpen);
  };

  const handleAddItemGroupClick = () => {
    let maxId = -1;
    for (let i = 0; i < itemGroups.length; i++) {
      if (itemGroups[i].id > maxId) {
        maxId = itemGroups[i].id;
      }
    }

    setItemGroups((prevItemGroups) => [
      ...prevItemGroups,
      { id: maxId + 1, name: `Group ${String.fromCharCode(65 + maxId)}` },
    ]);
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
          {itemGroups.map((itemGroup) => (
            <ItemGroup
              key={itemGroup.id}
              group={itemGroup}
              onClickAddItemGroup={handleAddItemGroupClick}
            />
          ))}
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
          <Typography variant="h6">Main Content</Typography>
        </Box>
      </TabPanel>
      <TabPanel value={selectedTab} index={1} panelContentSx={{ padding: 3 }}>
        <Typography variant="h6">Item Two</Typography>
      </TabPanel>
      <TabPanel value={selectedTab} index={2} panelContentSx={{ padding: 3 }}>
        <Typography variant="h6">Item Three</Typography>
      </TabPanel>
    </Box>
  );
}

export default App;
