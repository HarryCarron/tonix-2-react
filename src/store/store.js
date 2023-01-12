import { configureStore } from '@reduxjs/toolkit';
import connectorSlice from './features/connector/connectorSlice';
export default configureStore({
    reducer: { connectorSlice },
});
