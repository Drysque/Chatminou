import { Center, VStack, Text } from '@chakra-ui/react';

export const Home = (): JSX.Element => (
	<Center m="8px">
		<VStack spacing="32px">
			<VStack>
				<Text>Logo</Text>

				<Text fontSize="50px" color="pantoufle.primary" fontWeight={800}>
					Chatminou
				</Text>
				<Text fontSize="20px" color="pantoufle.primary" fontWeight={600}>
					Check your valorant store and stats online
				</Text>
			</VStack>
		</VStack>
	</Center>
);
