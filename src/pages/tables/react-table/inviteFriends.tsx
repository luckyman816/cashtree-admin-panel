// import { useMemo } from 'react';
import { useState, useEffect } from 'react';
import { useSelector } from 'store';
import { getFriends } from 'store/reducers/friends';

// material-ui
import { Grid } from '@mui/material';

// project import
// import makeData from 'data/react-table';
import FriendsTable from 'sections/tables/react-table/FriendsTable';

// ==============================|| REACT TABLE - GROUPING ||============================== //

const Grouping = () => {
  // const data = useMemo(() => makeData(1000), []);

  useEffect(()=>{
    getFriends();
  },[])
  // const data = useMemo(() => makeData(200), []);
  // const data = [
  //   { userName: 'Dash', friendName: 'Jhon', friendEmail: 'Jhon@it.com' },
  //   { userName: 'Dash', friendName: 'Steve', friendEmail: 'Steve@it.com' },
  //   { userName: 'Dash', friendName: 'Brown', friendEmail: 'Brown@it.com' },
  //   { userName: 'Stond', friendName: 'Jhon', friendEmail: 'Jhon@it.com' },
  //   { userName: 'Stond', friendName: 'Steve', friendEmail: 'Steve@it.com' },
  //   { userName: 'Simba', friendName: 'Jhon', friendEmail: 'Jhon@it.com' },
  //   { userName: 'Simba', friendName: 'Steve', friendEmail: 'Steve@it.com' },
  //   { userName: 'Simba', friendName: 'Brown', friendEmail: 'Brown@it.com' },
  //   { userName: 'Simba', friendName: 'Brown', friendEmail: 'Brown@it.com' }
  // ];
  const friends_state = useSelector((state) =>  state.friends.friendss)
  const [friends, setFriends]  = useState(friends_state)
  useEffect(()=>{
    setFriends(friends_state)
  },[friends_state])

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <FriendsTable data={friends} />
      </Grid>
    </Grid>
  );
};

export default Grouping;
