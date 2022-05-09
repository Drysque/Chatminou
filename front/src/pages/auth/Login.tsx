import { useState, useEffect } from 'react';
import { ArrowForwardIcon, ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import {
	Center,
	HStack,
	IconButton,
	Input,
	InputGroup,
	InputRightElement,
	Text,
	useBoolean,
	useToast,
	VStack,
} from '@chakra-ui/react';
import { Link, useHistory } from 'react-router-dom';

export const Login = (): JSX.Element => {
	const toast = useToast();
	const history = useHistory();
	// const [login, { data, isLoading, isSuccess, error }] = useLoginMutation();
	// const [fetchUser] = useLazyGetUserQuery();

	const [email, setEmail] = useState<string>('');
	const [password, setPassword] = useState<string>('');
	const [showPassword, { toggle: toggleShowPassword }] = useBoolean();

	// useEffect(() => {
	// 	if (isLoading) return;
	// 	if (isSuccess && data) {
	// 		localStorage.setItem('token', data.tokens.access.token);
	// 		fetchUser();
	// 		history.push('/feed'); // force reload
	// 	} else if (error) {
	// 		if ('status' in error) {
	// 			toast({
	// 				title: 'Invalid credentials.',
	// 				description: (error.data as { message: string })?.message,
	// 				status: 'error',
	// 			});
	// 		}
	// 	}
	// }, [isSuccess, isLoading, data, error, toast, history, fetchUser]);

	// const submit = () => login({ email, password });

	return (
		<Center>
			<VStack m="64px" align="start">
				<VStack minW="50vh" bg="chatminou.bg" p="16px 32px" border="base" borderRadius="32px">
					<Text fontSize="20px" fontWeight={700} color="chatminou.primary">
						Log into Chatminou
					</Text>
					<VStack align="end" w="100%">
						<Input
							_placeholder={{ color: 'chatminou.primary' }}
							borderColor="chatminou.primary"
							placeholder="Enter email"
							type="email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
						/>
						<InputGroup size="md">
							<Input
								_placeholder={{ color: 'chatminou.primary' }}
								borderColor="chatminou.primary"
								type={showPassword ? 'text' : 'password'}
								placeholder="Enter password"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
							/>
							<InputRightElement>
								<IconButton
									h="1.75rem"
									size="sm"
									onClick={toggleShowPassword}
									bg="chatminou.accent"
									colorScheme="yellow"
									aria-label="Hide password"
									icon={showPassword ? <ViewIcon /> : <ViewOffIcon />}
								/>
							</InputRightElement>
						</InputGroup>
						<IconButton
							// onClick={submit}
							bg="pantoufle.secondary"
							colorScheme="green"
							aria-label="Search database"
							icon={<ArrowForwardIcon />}
						/>
					</VStack>
				</VStack>
				<HStack>
					<Text color="pantoufle.primary">You don't have an account ? </Text>
					<Link to="/register">
						<Text color="pantoufle.primary" fontWeight={600} textDecoration="underline">
							Register
						</Text>
					</Link>
				</HStack>
			</VStack>
		</Center>
	);
};
