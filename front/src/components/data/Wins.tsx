import { useEffect, useMemo } from 'react';
import { Spinner, useToast } from '@chakra-ui/react';
import { ResponsiveBar } from '@nivo/bar';

import { useGetMMRQuery } from 'services/henrikApi/account';
import { useAppSelector } from 'services/hooks';

import { DataWrapper } from './Data';

export const Wins = (): JSX.Element => {
	const tagline = useAppSelector((state) => state.auth.tagline);
	const { data: mmr, isError: isMMRError } = useGetMMRQuery(tagline!, { skip: !tagline });
	const toast = useToast();

	useEffect(() => {
		isMMRError && toast({ title: 'Error', description: 'Could not fetch MMR', status: 'error' });
	}, [isMMRError, toast]);

	const data = useMemo(() => {
		if (!mmr) return [];
		return Object.entries(mmr.by_season)
			.reverse()
			.map(([act, season]) => ({
				act,
				won: 'error' in season ? 0 : season.wins,
				lost: 'error' in season ? 0 : season.number_of_games - season.wins,
			}));
	}, [mmr]);

	if (!mmr) return <Spinner />;

	return (
		<DataWrapper name="Your competitive wins each act">
			<ResponsiveBar
				data={data}
				margin={{ top: 20, right: 50, bottom: 50, left: 50 }}
				indexBy="act"
				keys={['won', 'lost']}
				labelSkipHeight={10}
				colors={(bar) => (bar.id === 'won' ? 'lightgreen' : 'red')}
			/>
		</DataWrapper>
	);
};

export const WinRate = (): JSX.Element => {
	const tagline = useAppSelector((state) => state.auth.tagline);
	const { data: mmr, isError: isMMRError } = useGetMMRQuery(tagline!, { skip: !tagline });
	const toast = useToast();

	useEffect(() => {
		isMMRError && toast({ title: 'Error', description: 'Could not fetch MMR', status: 'error' });
	}, [isMMRError, toast]);

	const data = useMemo(() => {
		if (!mmr) return [];
		return Object.entries(mmr.by_season)
			.reverse()
			.map(([act, season]) => {
				const winrate = 'error' in season ? 0 : season.wins / season.number_of_games;
				const loserate = 'error' in season ? 0 : 1 - winrate;

				return { act, winrate, loserate };
			});
	}, [mmr]);

	if (!mmr) return <Spinner />;

	return (
		<DataWrapper name="Your competitive win rate each act">
			<ResponsiveBar
				data={data}
				margin={{ top: 20, right: 50, bottom: 50, left: 50 }}
				indexBy="act"
				keys={['winrate', 'loserate']}
				labelSkipHeight={10}
				colors={(bar) => (bar.id === 'winrate' ? 'lightgreen' : 'red')}
				valueFormat=" >-.2%"
			/>
		</DataWrapper>
	);
};
