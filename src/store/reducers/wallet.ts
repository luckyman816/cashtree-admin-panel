// third-party
import { createSlice } from '@reduxjs/toolkit';

// project imports
import axios from 'utils/axios';
import { dispatch } from '../index';

// types
import { WalletProps } from 'types/wallet';


// ----------------------------------------------------------------------

const initialState: WalletProps = {
  wallets : [],
  error: null
};

const wallet = createSlice({
  name: 'wallet',
  initialState,
  reducers: {
    // HAS ERROR
    hasError(state, action) {
      state.error = action.payload;
    },
    putReducer(state, action) {
      state.wallets = action.payload;
    }
    // // GET USER
    // getUserSuccess(state, action) {
    //   state.user = action.payload;
    // },

    // // GET USER CHATS
    // getUserChatsSuccess(state, action) {
    //   state.chats = action.payload;
    // },

    // // GET USERS
    // getUsersSuccess(state, action) {
    //   state.users = action.payload;
    // }
  }
});

// Reducer
export default wallet.reducer;

// export const selectLeaders = (state:any)=>{
//   return state.leader;

// }

// ----------------------------------------------------------------------

// export function getUser(id: number) {
//   return async () => {
//     try {
//       const response = await axios.post('/api/chat/users/id', { id });
//       dispatch(chat.actions.getUserSuccess(response.data));
//     } catch (error) {
//       dispatch(chat.actions.hasError(error));
//     }
//   };
// }

// export function getUserChats(user: string | undefined) {
//   return async () => {
//     try {
//       const response = await axios.post('/api/chat/filter', { user });
//       dispatch(chat.actions.getUserChatsSuccess(response.data));
//     } catch (error) {
//       dispatch(chat.actions.hasError(error));
//     }
//   };
// }

// export function insertChat(chat: any) {
//   return async () => {
//     try {
//       await axios.post('/api/chat/insert', chat);
//     } catch (error) {
//       dispatch(chat.actions.hasError(error));
//     }
//   };
// }

export function getWallets() {
  return async () => {
    try {
      const response = await axios.get('/api/wallets/getall');
      dispatch(wallet.actions.putReducer(response.data));
    } catch (error) {
      dispatch(wallet.actions.hasError(error));
    }
  };
}
