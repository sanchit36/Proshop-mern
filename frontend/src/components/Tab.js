import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { Link } from 'react-router-dom';

export function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Box
      role='tabpanel'
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      sx={{ flex: 1 }}
      {...other}
    >
      {value === index && <Box sx={{ py: 3, ml: 6 }}>{children}</Box>}
    </Box>
  );
}

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

const TabsContainer = ({ value, handleChange, tabs = [], children }) => {
  return (
    <Box
      sx={{
        flexGrow: 1,
        bgcolor: 'background.paper',
        display: 'flex',
      }}
    >
      <Tabs
        orientation='vertical'
        variant='scrollable'
        value={value}
        onChange={handleChange}
        aria-label='Vertical tabs example'
        sx={{ borderRight: 1, borderColor: 'divider' }}
      >
        {tabs.map((tab, index) => (
          <Tab
            LinkComponent={Link}
            to={`/profile?tab=${tab.id}`}
            key={tab.id}
            label={tab.label}
            {...a11yProps(tab.id)}
          />
        ))}
      </Tabs>
      {children}
    </Box>
  );
};

export default TabsContainer;
