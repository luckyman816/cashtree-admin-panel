// import { useMemo } from 'react';
import { useState, useEffect } from 'react';
import { useSelector } from 'store';
import { getDailyUsers } from 'store/reducers/dailyUsers';

// material-ui
import { Grid } from '@mui/material';

// project import
// import makeData from 'data/react-table';
import DailyUsersTable from 'sections/tables/react-table/DailyUsersTable';

// ==============================|| REACT TABLE - GROUPING ||============================== //

const Grouping = () => {
  // const data = useMemo(() => makeData(1000), []);

  useEffect(()=>{
    getDailyUsers();
  },[])
  // const data = useMemo(() => makeData(200), []);
  // const data = [
  //   { date: '1/2', name: 'Jhon', email: 'Jhon@it.com' },
  //   { date: '1/2', name: 'Steve', email: 'Steve@it.com' },
  //   { date: '1/2', name: 'Brown', email: 'Brown@it.com' },
  //   { date: '1/5', name: 'Jhon', email: 'Jhon@it.com' },
  //   { date: '1/5', name: 'Steve', email: 'Steve@it.com' },
  //   { date: '1/6', name: 'Jhon', email: 'Jhon@it.com' },
  //   { date: '1/6', name: 'Steve', email: 'Steve@it.com' },
  //   { date: '1/6', name: 'Brown', email: 'Brown@it.com' },
  //   { date: '1/6', name: 'Brown', email: 'Brown@it.com' }
  // ];
  const dailyUsers_state = useSelector((state) =>  state.dailyUsers.dailyUsers)
  const [dailyUsers, setDailyUsers]  = useState(dailyUsers_state)
  useEffect(()=>{
    setDailyUsers(dailyUsers_state)
  },[dailyUsers_state])

  return (
    <Grid container spacing={3}> 
      <Grid item xs={12}>
        <DailyUsersTable data={dailyUsers} />
      </Grid>
    </Grid>
  );
};

export default Grouping;
