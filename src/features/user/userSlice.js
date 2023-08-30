import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchLoggedinUser, fetchLoggedinUserOrders, updateUser } from './userAPI';

const initialState = {
  userOrders: [],
  userInfo : null,
  status: 'idle',
};


export const fetchLoggedinUsersAsync = createAsyncThunk(
  'user/fetchLoggedinUser',
  async (userId) => {
    const response = await fetchLoggedinUser(userId);
    return response.data;
  }
);

export const updateUserAsync = createAsyncThunk(
  'user/updateUser',
  async (id) => {
    const response = await updateUser(id);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);


export const fetchLoggedinUserOrdersAsync = createAsyncThunk(
  'user/fetchLoggedinUserOrders',
  async (userId) => {
    const response = await fetchLoggedinUserOrders(userId);
    return response.data;
  }
);

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    
  },
 
  extraReducers: (builder) => {
    builder
      .addCase(fetchLoggedinUsersAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchLoggedinUsersAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.userInfo = action.payload;
      })
      .addCase(updateUserAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateUserAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.userInfo = action.payload;
      })
      .addCase(fetchLoggedinUserOrdersAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchLoggedinUserOrdersAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.userOrders = action.payload;
      });
  },
});

export const { increment, } = userSlice.actions;


// export const selectCount = (state) => state.counter.value;
export const selectUserInfo = (state) => state.user.userInfo;
export const selectUserOrders = (state) => state.user.userOrders;



export default userSlice.reducer;
