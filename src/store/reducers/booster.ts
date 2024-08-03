// third-party
import { createSlice } from '@reduxjs/toolkit';

// project imports
import axios from 'utils/axios';
import { dispatch } from '../index';

// types
import { boostersProps } from 'types/boosters';


// ----------------------------------------------------------------------

const initialState: boostersProps = {
  boosters : [],
  error: null
};

const boosters = createSlice({
  name: 'boosters',
  initialState,
  reducers: {
    // HAS ERROR
    hasError(state, action) {
      state.error = action.payload;
    },
    putReducer(state, action) {
      state.boosters = action.payload;
    }

  }
});

// Reducer
export default boosters.reducer;


export function getDailyBoosters() {
  return async () => {
    try {
      const response = await axios.get('/api/boosters/getall');
      dispatch(boosters.actions.putReducer(response.data));
    } catch (error) {
      dispatch(boosters.actions.hasError(error));
    }
  };
}
