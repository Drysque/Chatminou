import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseQuery = fetchBaseQuery({
	baseUrl: 'https://api.henrikdev.xyz/valorant',
});

export const henrikApi = createApi({
	reducerPath: 'henrikApi',
	baseQuery,
	endpoints: () => ({}),
});
