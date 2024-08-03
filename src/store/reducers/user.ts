// third-party
import { createSlice } from '@reduxjs/toolkit';

// project imports
import axios from 'utils/axios';
import { dispatch } from '../index';

// types
import { UsersProps } from 'types/user';


// ----------------------------------------------------------------------

const initialState: UsersProps = {
  users : [],
  error: null
};

const users = createSlice({
  name: 'users',
  initialState,
  reducers: {
    // HAS ERROR
    hasError(state, action) {
      state.error = action.payload;
    },
    putReducer(state, action) {
      state.users = action.payload;
    }

  }
});

// Reducer
export default users.reducer;


export function getUsers() {
  return async () => {
    try {
      const response = await axios.get('/api/users/getall');
      dispatch(users.actions.putReducer(response.data));
    } catch (error) {
      dispatch(users.actions.hasError(error));
    }
  };
}
