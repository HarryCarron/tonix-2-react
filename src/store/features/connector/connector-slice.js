import { createSlice } from '@reduxjs/toolkit';

export const connectorSlice = createSlice({
    name: 'connector',
    initialState: {
        attempt: {},
        attemptingConnection: {},
        currentConnections: [],
    },
    reducers: {
        attemptConnection: (state, action) => {
            state.attempt = action.payload;
            console.log(state.attempt);
        },
        updateConnection: (state, action) => {
            state.attempt.to = action.payload.to;
        },
        connectionSuccess: (state, action) => {
            state.currentConnections.push({
                from: state.attempt.from,
                to: action.payload,
            });
            state.attempt = {};
        },
    },
});

// Action creators are generated for each case reducer function
export const { attemptConnection, updateConnection, connectionSuccess } =
connectorSlice.actions;

export default connectorSlice.reducer;