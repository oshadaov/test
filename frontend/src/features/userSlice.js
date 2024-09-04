import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user : null,
    isLoading: true
}

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers:{
        signinUser:(state,action) => {
            state.user = action.payload;
        },

        logOutUser : (state) => {
            state.user = null;
        },
        setLoading : (state,action) => {
          state.isLoading = action.payload  
    },
}
})
 
export const {signinUser,logOutUser,setLoading} = userSlice.actions