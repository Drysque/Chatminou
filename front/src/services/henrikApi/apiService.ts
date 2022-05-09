import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const henrikUrl = 'https://api.henrikdev.xyz';

const baseQuery = fetchBaseQuery({
	baseUrl: `${henrikUrl}/valorant`,
});

export type ApiReturn<T> = {
	status: number;
	data: T;
};

export const henrikApi = createApi({
	tagTypes: ['Account'],
	reducerPath: 'henrikApi',
	baseQuery,
	endpoints: () => ({}),
});
