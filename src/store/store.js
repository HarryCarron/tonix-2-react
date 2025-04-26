import { configureStore } from '@reduxjs/toolkit';
import connectorSlice from './features/connector/connector-slice';
import activeComponentSlice from './features/active-components/active-component-slice';
export default configureStore({
    reducer: { connectorSlice, activeComponentSlice },
});
