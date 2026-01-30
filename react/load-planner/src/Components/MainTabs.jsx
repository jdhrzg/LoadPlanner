import * as React from 'react';
import { Box, Tab, Tabs } from '@mui/material';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      id={`tabpanel-${index}`}
      hidden={value !== index}
      role="tabpanel"
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function setProps(index) {
  return {
    id: `tab-${index}`,
    'aria-controls': `tabpanel-${index}`,
  };
}

export function MainTabs() {
  const [selectedTab, setSelectedTab] = React.useState(0);

  const handleChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={selectedTab} onChange={handleChange} aria-label="main tabs">
          <Tab label="Item One" {...setProps(0)} />
          <Tab label="Item Two" {...setProps(1)} />
          <Tab label="Item Three" {...setProps(2)} />
        </Tabs>
      </Box>
      <TabPanel value={selectedTab} index={0}>
        Item One
      </TabPanel>
      <TabPanel value={selectedTab} index={1}>
        Item Two
      </TabPanel>
      <TabPanel value={selectedTab} index={2}>
        Item Three
      </TabPanel>
    </Box>
  );
}