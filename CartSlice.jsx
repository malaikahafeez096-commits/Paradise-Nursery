import { createSlice } from '@reduxjs/toolkit';

export const CartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [], // Array of items: { name, image, description, cost, quantity }
  },
  reducers: {
    // Adds a new item or increments its quantity if already present
    addItem: (state, action) => {
      const { name, image, cost, description } = action.payload;
      const existingItem = state.items.find((item) => item.name === name);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({
          name,
          image,
          cost,
          description: description || '',
          quantity: 1,
        });
      }
    },
    // Removes an item completely by plant name or object
    removeItem: (state, action) => {
      const targetName =
        typeof action.payload === 'object' && action.payload?.name
          ? action.payload.name
          : action.payload;
      state.items = state.items.filter((item) => item.name !== targetName);
    },
    // Updates item quantity based on payload { name, quantity }
    updateQuantity: (state, action) => {
      const { name, quantity } = action.payload;
      const itemToUpdate = state.items.find((item) => item.name === name);
      if (itemToUpdate) {
        if (quantity > 0) {
          itemToUpdate.quantity = quantity;
        } else {
          // If quantity reaches 0 or below, remove the item
          state.items = state.items.filter((item) => item.name !== name);
        }
      }
    },
  },
});

export const { addItem, removeItem, updateQuantity } = CartSlice.actions;

export default CartSlice.reducer;