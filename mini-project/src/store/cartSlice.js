import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    items: []
}

const cartSlice = createSlice({
    name:'cart',
    initialState,
    reducers:{
        addItem : (state, action) => {
            const existingItem = state.items.find(item => item.id === action.payload.id)
            if(existingItem){
                existingItem.quantity += action.payload.quantity
            } else {
                state.items.push({...action.payload})
            }
        },
        removeItem: (state, action) => {
            state.items = state.items.filter(item => !(item.id === action.payload.id))
        },
        incrementQuantity : (state, action) => {
            const item = state.items.find (item => item.id === action.payload.id)
            if (item) {
                item.quantity ++
            }
        },
        decrementQuantity : (state, action) => {
            const item = state.items.find (item => item.id === action.payload.id )
            if (item && item.quantity > 1) {
                item.quantity --
            }
        },
        updateQuantity : (state, action) => {
            const item = state.items.find (item => item.id === action.payload.id )
            if (item) {
                item.quantity = action.payload.quantity
            }
        },
        clearCart: (state)=>{
            state.items = [];
        }
    
    }
})

export const {addItem, removeItem, incrementQuantity, decrementQuantity, updateQuantity, clearCart} = cartSlice.actions;
export default cartSlice.reducer;