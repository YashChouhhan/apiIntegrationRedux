import { configureStore } from '@reduxjs/toolkit';
import addUserSliceReducer from '../Slice/getUserSlice';


 const store =  configureStore({
  reducer: {
    getUser: addUserSliceReducer
  },
});
export default store

