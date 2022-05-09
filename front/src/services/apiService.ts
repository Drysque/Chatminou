import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const valorantUrl = '';

const apiBase = fetchBaseQuery({
	baseUrl: `${valorantUrl}/v1`,
	prepareHeaders: (headers) => {
		const token = localStorage.getItem('token');
		if (token) headers.set('authorization', `Bearer ${token}`);
		return headers;
	},
});

export const valorantApi = createApi({
	tagTypes: [],
	reducerPath: 'valorantApi',
	baseQuery: apiBase,
	endpoints: () => ({}),
});
