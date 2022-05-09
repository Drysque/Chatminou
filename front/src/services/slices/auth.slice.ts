import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type Tagline = {
	name: string;
	tag: string;
}

interface AuthState {
	tagline?: Tagline;
}

const initialState: AuthState = {};

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		setTagline(state, action: PayloadAction<Tagline>) {
			state.tagline = action.payload;
		},
	},
});

export const { setTagline } = authSlice.actions;

export default authSlice.reducer;
