import { Avatar, Box, HStack, Spinner, Text, VStack } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

import { useGetAccountQuery } from 'services/henrikApi/account';
import { useAppSelector } from 'services/hooks';

export const Header = (): JSX.Element => {
	const tagline = useAppSelector((state) => state.auth.tagline);
	const { isSuccess, isLoading, data: account } = useGetAccountQuery(tagline!, { skip: !tagline });

	return (
		<VStack w="100%" align="start">
			<HStack w="100%" justify="space-between" bg="chatminou.secondary" p="8px 16px">
				<Box bg="white" border="base" borderRadius="15px">
					<Link to="/">
						<HStack m="5px 10px">
							<Text>/Logo/</Text>
							<Text color="chatminou.primary" fontSize="18px">
								Chatminou
							</Text>
						</HStack>
					</Link>
				</Box>
				{isSuccess ? (
					<Link to="/profile">
						<HStack align="center">
							<Avatar name={account.name} src={account.card.small} />
							<Text color="white">
								{account.name}#{account.tag}
							</Text>
						</HStack>
					</Link>
				) : isLoading ? (
					<Spinner size="sm" />
				) : (
					<Link to="/login">
						<Text color="chatminou.accent" fontWeight={600}>
							Login
						</Text>
					</Link>
				)}
			</HStack>
		</VStack>
	);
};
