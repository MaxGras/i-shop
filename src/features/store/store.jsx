import { configureStore } from '@reduxjs/toolkit';
import phoneReducer from '../smartphones/phoneSlice';
import commentReducer from '../comments/commentSlice';
export default configureStore({
    reducer:{
        phones: phoneReducer,
        comments: commentReducer
    }
})

