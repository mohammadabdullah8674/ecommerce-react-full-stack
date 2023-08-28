import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { createUser, checkUser } from './authAPI';

const initialState = {
  loggedInUser: null ,
  status: 'idle',
  error : null
};


export const createUserAsync = createAsyncThunk(
  'user/createUser',
  async (userData) => {
    const response = await createUser(userData);
    return response.data;
  }
);

export const checkUserAsync = createAsyncThunk(
  'user/checkUser',
  async (logInInfo) => {
    const response = await checkUser(logInInfo);
    return response.data;
  }
);

export const createUserSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    
  },
 
  extraReducers: (builder) => {
    builder
      .addCase(createUserAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createUserAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.loggedInUser = action.payload;
      })
      .addCase(checkUserAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(checkUserAsync.rejected, (state,action) => {
        state.error = action.error;
      })
      .addCase(checkUserAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.loggedInUser = action.payload;
      });
  },
});

// export const { increment, } = createUserSlice.actions;


export const selectCount = (state) => state.counter.value;
export const selectLoggedInUser = (state) => state.auth.loggedInUser;
export const selectError = (state) => state.auth.error;



export default createUserSlice.reducer;
