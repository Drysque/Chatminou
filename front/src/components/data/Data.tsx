import { VStack, Box, Text } from '@chakra-ui/react';

export const DataWrapper: React.FC<{
	name: string;
}> = ({ children, name }): JSX.Element => (
	<VStack w="100%" align="start">
		<Text fontSize="18px">{name}</Text>
		<Box w="100%" h="500px">
			{children}
		</Box>
	</VStack>
);
