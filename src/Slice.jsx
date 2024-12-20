import { createSlice } from '@reduxjs/toolkit';

export const Slice = createSlice({
    name: 'user',
    initialState: {
        items: JSON.parse(localStorage.getItem('items')) || [],
        searchQuery: '',
        sortOrder: '', 
    },

    reducers: {
        addUser: (state, action) => {
            console.log(action.payload);
            state.items.push(action.payload);
           
        },
        deleteUser: (state, action) => {
            state.items = state.items.filter((i, index) => index !== action.payload);
  
        },
        editUser: (state, action) => {
            const index = state.items.findIndex(user => user.userId === action.payload.userId);
            if (index !== -1) {
                state.items[index] = action.payload;
                localStorage.setItem('items', JSON.stringify(state.items)); // Sync with localStorage
            }},
        searching (state, action) {
            state.searchQuery = action.payload;
        },
        setSortOrder: (state, action) => {
            state.sortOrder = action.payload;
          },

    }
});

export const { addUser, deleteUser,editUser,searching ,setSortOrder} = Slice.actions;

