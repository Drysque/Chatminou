import { useEffect, useMemo } from 'react';
import { Center, Spinner, Image, VStack, Text, HStack, Tooltip, Badge, Progress, useToast } from '@chakra-ui/react';

import { useAppSelector } from 'services/hooks';
import { useGetAccountQuery, useGetMMRQuery } from 'services/henrikApi/account';
import ranks from 'services/utils/ranks.json';

import { WinRate, Wins } from 'components/data/Wins';
import { Rank } from 'components/data/Rank';

export const Profile = (): JSX.Element => {
	const tagline = useAppSelector((state) => state.auth.tagline);
	const { data: account } = useGetAccountQuery(tagline!, { skip: !tagline });
	const toast = useToast();

	const { data: mmr, isError: isMMRError } = useGetMMRQuery(tagline!, { skip: !tagline });

	useEffect(() => {
		isMMRError && toast({ title: 'Error', description: 'Could not fetch MMR', status: 'error' });
	}, [isMMRError, toast]);

	const current_rank = useMemo(
		() => ranks.reverse()[0].tiers.find((tier) => tier.tier === mmr?.current_data.currenttier)!,
		[mmr],
	);

	if (!account || !mmr) return <Spinner />;

	return (
		<Center>
			<VStack w="100%">
				<VStack m="64px" align="start">
					<HStack w="100%">
						{current_rank.smallIcon && (
							<Tooltip label={current_rank.tierName}>
								<Image src={current_rank.smallIcon} maxH="40px" />
							</Tooltip>
						)}
						<Progress
							value={mmr.current_data.ranking_in_tier}
							w="100%"
						/>
						<Text fontSize="14px">{mmr.current_data.ranking_in_tier}/100</Text>
					</HStack>
					<HStack>
						<Tooltip label={account.puuid}>
							<HStack spacing="0px" align="baseline">
								<Text fontSize="22px">{account.name}</Text>
								<Text fontSize="14px">#{account.tag}</Text>
							</HStack>
						</Tooltip>
						<Badge variant="solid">{account.account_level}</Badge>
						<Badge variant="outline">{account.region}</Badge>
					</HStack>
					<Image w="100%" src={account.card.wide} />
				</VStack>
				<Rank />
				<Wins />
				<WinRate />
			</VStack>
		</Center>
	);
};
