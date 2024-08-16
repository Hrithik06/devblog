import { createSlice } from '@reduxjs/toolkit';

const homeSlice = createSlice({
    name: 'home',
    initialState: {
        homeBlogs: null,
    },
    reducers: {
        addHomeBlogs: (state, action) => {
            state.homeBlogs = action.payload;
        },
    },
});

export const { addHomeBlogs } = homeSlice.actions;
export default homeSlice.reducer;
