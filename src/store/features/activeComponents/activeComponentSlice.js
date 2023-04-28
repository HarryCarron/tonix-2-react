import { createSlice } from '@reduxjs/toolkit';

export const activeComponentSlice = createSlice({
    name: 'activeComponents',
    initialState: {
        activeComponents: [],
    },
    reducers: {
        addToWorkspace: (state, action) => {
            const id = action.payload;
            state.activeComponents = [...state.activeComponents, id];
        },
        removeFromWorkspace: (state, action) => {
            const id = action.payload;
            return {
                ...state,
                activeComponents: state.activeComponents.filter(
                    activeComponent => activeComponent !== id
                ),
            };
        },
    },
});

export const { addToWorkspace, removeFromWorkspace } =
    activeComponentSlice.actions;

export default activeComponentSlice.reducer;
