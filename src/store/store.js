import { configureStore } from '@reduxjs/toolkit';
import connectorSlice from './features/connector/connectorSlice';
import activeComponentSlice from './features/activeComponents/activeComponentSlice';
export default configureStore({
    reducer: { connectorSlice, activeComponentSlice },
});
