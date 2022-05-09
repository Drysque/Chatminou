import {
	Box,
	Center,
	Spinner,
	Table,
	TableCaption,
	TableContainer,
	Tbody,
	Td,
	Tr,
	Image,
	VStack,
} from '@chakra-ui/react';

import { useAppSelector } from 'services/hooks';
import { useGetAccountQuery } from 'services/henrikApi/account';

export const Profile = (): JSX.Element => {
	const tagline = useAppSelector((state) => state.auth.tagline);
	const { data: account } = useGetAccountQuery(tagline!, { skip: !tagline });

	if (!account) return <Spinner />;

	console.log(account.card);

	return (
		<Center>
			<VStack m="64px" bg="chatminou.bg" p="16px 32px" border="base" borderRadius="16px">
				<TableContainer>
					<Table variant="simple" colorScheme="black">
						<TableCaption placement="top">Your account information</TableCaption>
						<Tbody>
							<Tr>
								<Td>Username</Td>
								<Td>{account.name}</Td>
							</Tr>
							<Tr>
								<Td>Tag</Td>
								<Td>{account.tag}</Td>
							</Tr>
							<Tr>
								<Td>Unique User ID</Td>
								<Td>{account.puuid}</Td>
							</Tr>
							<Tr>
								<Td>Account Level</Td>
								<Td>{account.account_level}</Td>
							</Tr>
							<Tr>
								<Td>Region</Td>
								<Td>{account.region}</Td>
							</Tr>
						</Tbody>
					</Table>
				</TableContainer>
				<Image w="100%" src={account.card.wide} />
			</VStack>
		</Center>
	);
};
