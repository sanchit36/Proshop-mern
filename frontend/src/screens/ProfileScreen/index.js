import React, { useCallback, useEffect, useState } from 'react';
import Tabs, { TabPanel } from '../../components/Tab';
import { useSearchParams } from 'react-router-dom';
import AccountDetails from './AccountDetails';
import ChangePassword from './ChangePassword';
import OrderList from './OrderList';

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
  const [searchParams] = useSearchParams();
  const [value, setValue] = useState(0);

  useEffect(() => {
    const tabValue = searchParams.get('tab');
    const val = tabValue ? (!isNaN(tabValue) ? Number(tabValue) - 1 : 0) : 0;
    setValue(val);
  }, [searchParams]);

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

      {/* ORDER LIST */}
      <TabPanel value={value} index={2}>
        <OrderList />
      </TabPanel>
    </Tabs>
  );
};

export default ProfileScreen;
