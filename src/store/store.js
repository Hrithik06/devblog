import { configureStore } from '@reduxjs/toolkit';
import auth from './authSlice';
import home from './homeSlice';
const store = configureStore({
    reducer: {
        auth: auth,
        home: home,
    },
});

export default store;
