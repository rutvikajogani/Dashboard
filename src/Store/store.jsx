import { configureStore } from '@reduxjs/toolkit'
import {Slice} from '../Slice'


const store = configureStore({
    reducer: {
       
        
        user: Slice.reducer
        
    },
})

export default store;