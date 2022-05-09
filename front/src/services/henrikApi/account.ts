import { Tagline } from 'services/slices/auth.slice';
import { ApiReturn } from 'services/utils';

import { henrikApi } from './apiService';

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

type Season =
	| {
			wins: number;
			number_of_games: number;
			final_rank: number;
			act_rank_wins: {
				tier: number;
			}[];
	  }
	| {
			error: 'No data Available';
	  };

type AccountMMR = {
	current_data: {
		currenttier: number;
		ranking_in_tier: number;
		mmr_change_to_last_game: number;
		elo: number;
		games_needed_for_rating: number;
	};
	by_season: Record<string, Season>;
};

const extendedApi = henrikApi.injectEndpoints({
	endpoints: (builder) => ({
		getAccount: builder.query<Account, Tagline>({
			query: ({ name, tag }) => `/v1/account/${name}/${tag}`,
			transformResponse: (response: ApiReturn<Account>) => response.data,
		}),
		getMMR: builder.query<AccountMMR, Tagline>({
			query: ({ name, tag }) => `/v2/mmr/eu/${name}/${tag}`,
			transformResponse: (response: ApiReturn<AccountMMR>) => response.data,
		}),
	}),
});

export const { useGetAccountQuery, useLazyGetAccountQuery, useGetMMRQuery } = extendedApi;
