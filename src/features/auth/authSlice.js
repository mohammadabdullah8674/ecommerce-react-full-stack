import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { createUser, checkUser, updateUser, signOut } from './authAPI';

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
  async (logInInfo, {rejectWithValue}) => {
    try {
      const response = await checkUser(logInInfo);
      return response.data;
    } catch (error) {
      return rejectWithValue(error)
    }
  }
);
export const updateUserAsync = createAsyncThunk(
  'user/updateUser',
  async (update) => {
    const response = await updateUser(update);
    return response.data;
  }
);
export const signOutAsync = createAsyncThunk(
  'user/signOut',
  async (userId) => {
    const response = await signOut(userId);
    return response.data;
  }
);

export const UserSlice = createSlice({
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
        state.error = action.payload;
      })
      .addCase(checkUserAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.loggedInUser = action.payload;
      })
      .addCase(updateUserAsync.rejected, (state,action) => {
        state.error = action.error;
      })
      .addCase(updateUserAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.loggedInUser = action.payload;
      })
      .addCase(signOutAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(signOutAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.loggedInUser = null;
      });
  },
});

// export const { increment, } = createUserSlice.actions;


export const selectLoggedInUser = (state) => state.auth.loggedInUser;
export const selectError = (state) => state.auth.error;



export default UserSlice.reducer;
