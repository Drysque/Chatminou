import { Tagline } from 'services/slices/auth.slice';

import { ApiReturn, henrikApi } from './apiService';

type Account = {
	puuid: string;
	region: string;
	account_level: number;
	name: string;
	tag: string;
	card: {
		small: string;
		large: string;
		wide: string;
		id: string;
	};
	last_update: string;
};

const extendedApi = henrikApi.injectEndpoints({
	endpoints: (builder) => ({
		getAccount: builder.query<Account, Tagline>({
			query: ({ name, tag }) => `/v1/account/${name}/${tag}`,
			providesTags: ['Account'],
			transformResponse: (response: ApiReturn<Account>) => response.data,
		}),
	}),
});

export const { useGetAccountQuery, useLazyGetAccountQuery } = extendedApi;
