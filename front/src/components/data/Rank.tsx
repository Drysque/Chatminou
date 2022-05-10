import { useEffect, useMemo } from 'react';
import { HStack, Image, Spinner, Text, useToast } from '@chakra-ui/react';
import { ResponsiveLine } from '@nivo/line';

import { useGetMMRQuery } from 'services/henrikApi/account';
import { useAppSelector } from 'services/hooks';
import ranks from 'services/utils/ranks.json';

import { DataWrapper } from './Data';

export const Rank = (): JSX.Element => {
	const tagline = useAppSelector((state) => state.auth.tagline);
	const { data: mmr, isError: isMMRError } = useGetMMRQuery(tagline!, { skip: !tagline });
	const toast = useToast();

	useEffect(() => {
		if (isMMRError) {
			toast({ title: 'Error', description: 'Could not get MMR data', status: 'error' });
		}
	}, [isMMRError, toast]);

	const data = useMemo(() => {
		if (!mmr) return [];
		return [
			{
				id: 'Final Rank',
				data: Object.entries(mmr.by_season)
					.reverse()
					.map(([act, season]) => ({
						x: act,
						y: 'error' in season ? null : season.final_rank,
					})),
			},
		];
	}, [mmr]);

	if (!mmr) return <Spinner />;

	return (
		<DataWrapper name="Your competitive rank each act">
			{/* @ts-ignore */}
			<ResponsiveLine
				data={data}
				margin={{ top: 20, right: 50, bottom: 50, left: 50 }}
				useMesh
				curve="stepAfter"
				tooltip={({ point }) => {
					const tier = ranks
						.find((rank) => rank.episode === +point.data.x.toString().charAt(1))!
						.tiers.find((tier) => tier.tier === point.data.y)!;
					return (
						<HStack bg={`#${tier.backgroundColor}`} p="2px 4px">
							{tier.smallIcon && <Image src={tier.smallIcon} maxH="40px" />}
							<Text>{tier.tierName}</Text>
						</HStack>
					);
				}}
			/>
		</DataWrapper>
	);
};
