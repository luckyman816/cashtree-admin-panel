// import { useMemo } from 'react';
import { useState, useEffect } from 'react';
import { useSelector } from 'store';
import { getDailyBoosters } from 'store/reducers/booster';

// material-ui
import { Grid } from '@mui/material';

// project import
// import makeData from 'data/react-table';
import DailyBoostersTable from 'sections/tables/react-table/DailyBoostersTable';

// ==============================|| REACT TABLE - GROUPING ||============================== //

const Grouping = () => {
  // const data = useMemo(() => makeData(1000), []);

  useEffect(()=>{
    getDailyBoosters();
  },[])
  // const data = useMemo(() => makeData(200), []);
  // const data = [
  //   { date: '1/2', name: 'Jhon',  refill: 'Jhdsafcvn',  double: 'lldJholmklkn', email: 'Jhon@it.com' },
  //   { date: '1/2', name: 'Steve', refill: 'Stdsafcvve', double: 'lldStelmklkve', email: 'Steve@it.com' },
  //   { date: '1/2', name: 'Brown', refill: 'Brdsafcvwn', double: 'lldBrolmklkwn', email: 'Brown@it.com' },
  //   { date: '1/5', name: 'Jhon',  refill: 'Jhdsafcvn',  double: 'lldJholmklkn', email: 'Jhon@it.com' },
  //   { date: '1/5', name: 'Steve', refill: 'Stdsafcvve', double: 'lldStelmklkve', email: 'Steve@it.com' },
  //   { date: '1/6', name: 'Jhon',  refill: 'Jhdsafcvn',  double: 'lldJholmklkn', email: 'Jhon@it.com' },
  //   { date: '1/6', name: 'Steve', refill: 'Stdsafcvve', double: 'lldStelmklkve', email: 'Steve@it.com' },
  //   { date: '1/6', name: 'Brown', refill: 'Brdsafcvwn', double: 'lldBrolmklkwn', email: 'Brown@it.com' },
  //   { date: '1/6', name: 'Brown', refill: 'Brdsafcvwn', double: 'lldBrolmklkwn', email: 'Brown@it.com' }
  // ];
  const dailyBoosters_state = useSelector((state) =>  state.booster.boosters)
  const [dailyBoosters, setDailyBoosters]  = useState(dailyBoosters_state)
  useEffect(()=>{
    setDailyBoosters(dailyBoosters_state)
  },[dailyBoosters_state])

  return (
    <Grid container spacing={3}> 
      <Grid item xs={12}>
        <DailyBoostersTable data={dailyBoosters} />
      </Grid>
    </Grid>
  );
};

export default Grouping;
