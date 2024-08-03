// import { useMemo } from 'react';
import { useState, useEffect } from 'react';
import { useSelector } from 'store';
import { getMissions } from 'store/reducers/missionTask';

// material-ui
import { Grid } from '@mui/material';

// project import
// import makeData from 'data/react-table';
import MissionTaskTable from 'sections/tables/react-table/MissionTaskTable';

// ==============================|| REACT TABLE - GROUPING ||============================== //

const Grouping = () => {
  // const data = useMemo(() => makeData(1000), []);

  useEffect(()=>{
    getMissions();
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
  const missions_state = useSelector((state) => state.missionTask.missions)
  const [missions, setMissions]  = useState(missions_state)
  useEffect(()=>{
    setMissions(missions_state)
  },[missions_state])

  return (
    <Grid container spacing={3}> 
      <Grid item xs={12}>
        <MissionTaskTable data={missions} />
      </Grid>
    </Grid>
  );
};

export default Grouping;
