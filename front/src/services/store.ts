import { combineReducers, configureStore } from '@reduxjs/toolkit';

import { henrikApi } from './henrikApi/apiService';
import authReducer from './slices/auth.slice';

const reducers = combineReducers({
	[henrikApi.reducerPath]: henrikApi.reducer,
	auth: authReducer,
});

const store = configureStore({
	reducer: reducers,
	middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(henrikApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export { store };
