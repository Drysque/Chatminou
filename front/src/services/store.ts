import { combineReducers, configureStore } from '@reduxjs/toolkit';

import { valorantApi } from 'services/apiService';

const reducers = combineReducers({
	[valorantApi.reducerPath]: valorantApi.reducer,
});

const store = configureStore({
	reducer: reducers,
	middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(valorantApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export { store };
