import React, { useCallback, useState } from 'react';
import Tabs, { TabPanel } from '../../components/Tab';
import AccountDetails from './AccountDetails';
import ChangePassword from './ChangePassword';

const TABS = [
  {
    id: 1,
    label: 'Account Details',
  },
  {
    id: 2,
    label: 'Change Password',
  },
  {
    id: 3,
    label: 'My Order',
  },
];

const ProfileScreen = () => {
  const [value, setValue] = useState(0);

  const handleChange = useCallback((event, newValue) => {
    setValue(newValue);
  }, []);

  return (
    <Tabs value={value} handleChange={handleChange} tabs={TABS}>
      {/* ACCOUNT DETAILS */}
      <TabPanel value={value} index={0}>
        <AccountDetails />
      </TabPanel>

      {/* CHANGE PASSWORD */}
      <TabPanel value={value} index={1}>
        <ChangePassword />
      </TabPanel>

      <TabPanel value={value} index={2}>
        Coming Soon....
      </TabPanel>
    </Tabs>
  );
};

export default ProfileScreen;
