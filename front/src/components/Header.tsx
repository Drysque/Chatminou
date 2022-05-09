import { Box, HStack, Text, VStack } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

export const Header = (): JSX.Element => {
	return (
		<VStack w="100%" align="start">
			<HStack w="100%" justify="space-between" bg="pantoufle.secondary" p="8px 16px">
				<Box bg="white" border="base" borderRadius="15px">
					<Link to="/">
						<HStack m="5px 10px">
							<Text>Logo</Text>
							<Text color="pantoufle.primary" fontSize="18px">
								Pantoufle
							</Text>
						</HStack>
					</Link>
				</Box>
				{"user" ? (
					<Link to="/profile">
						<Text color="white">{"user.name"}</Text>
					</Link>
				) : (
					<Link to="/login">
						<Text color="pantoufle.accent" fontWeight={600}>
							Login
						</Text>
					</Link>
				)}
			</HStack>
		</VStack>
	);
};
