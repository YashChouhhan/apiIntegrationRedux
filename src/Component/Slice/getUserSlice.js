import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchUserData = createAsyncThunk(
  "getuser/fetchUserData",
  async () => {
    const response = await fetch("http://localhost:8000/employees");
    return response.json();
  }
);
export const postUserData = createAsyncThunk(
  "getuser/postUserData",
  async (data, thunkAPI) => {
    const response = await axios.post("http://localhost:8000/employees", data);
    thunkAPI.dispatch(fetchUserData());
    return response.json();
  }
);

export const removeData = createAsyncThunk(
  "getuser/removeData",
  async (index, thunkAPI) => {
    const response = await axios.delete(
      `http://localhost:8000/employees/${index}`
    );
    return { id: index }; // Return the response data if needed
  }
);
//update data
export const setSelectedData = createAsyncThunk(
  "getuser/setSelectedData",
  async (data, thunkAPI) => {
    return data
  }
);


export const editData = createAsyncThunk(
  "getuser/editData",
  async (data, thunkAPI) => {
    const response = await axios.patch(
      `http://localhost:8000/employees/${data.id}`,
      data
    );
    return response.data; // Return the updated data
  }
);


const getuserSlice = createSlice({
  name: "getuser",
  initialState: {
    isLoading: false,
    data: [],
    isError: false,
    selectedData: {}
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUserData.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchUserData.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
    });
    builder.addCase(fetchUserData.rejected, (state) => {
      state.isLoading = false;
      state.isError = true;
    });
    builder.addCase(postUserData.fulfilled, (state, action) => {
      console.log(action);
    });
    builder.addCase(removeData.fulfilled, (state, action) => {
      state.data = state.data.filter((user) => user.id !== action.payload.id);
      if(action.payload.id == state?.selectedData?.id) {
         state.selectedData = {} ;
      }
    });
    builder.addCase(setSelectedData.fulfilled, (state, action) => {
      state.selectedData = action.payload
    });
    builder.addCase(editData.fulfilled, (state, action) => {
      state.selectedData = {};
      state.data = state.data.map((data) => {
        if(data?.id == action.payload.id) {
          return action.payload
        }
        return data;
      });
    });
  },
});

export default getuserSlice.reducer;
