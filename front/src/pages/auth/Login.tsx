import { useState, useEffect } from 'react';
import { ArrowForwardIcon } from '@chakra-ui/icons';
import { Center, HStack, IconButton, Input, Text, useToast, VStack } from '@chakra-ui/react';
import { useHistory } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from 'services/hooks';
import { setTagline, Tagline } from 'services/slices/auth.slice';
import { useGetAccountQuery } from 'services/henrikApi/account';

const Drysque: Tagline = {
	tag: '1322',
	name: 'Drysque',
};

export const Login = (): JSX.Element => {
	const toast = useToast();
	const history = useHistory();
	const dispatch = useAppDispatch();
	const tagline = useAppSelector((state) => state.auth.tagline);
	const {
		isSuccess: isLoginSuccess,
		isLoading: isLoginLoading,
		isError: isLoginError,
	} = useGetAccountQuery(tagline!, { skip: !tagline });

	const [name, setName] = useState<string>(Drysque.name);
	const [tag, setTag] = useState<string>(Drysque.tag);

	useEffect(() => {
		isLoginSuccess && history.push('/');
		isLoginError && toast({ title: 'User not found', description: 'Wrong username or tag' });
	}, [history, isLoginError, isLoginSuccess, toast]);

	const submit = () => dispatch(setTagline({ name, tag }));

	return (
		<Center m="64px">
			<VStack bg="chatminou.bg" p="16px 32px" border="base" borderRadius="16px">
				<Text fontSize="20px" fontWeight={700} color="chatminou.primary">
					Log into Chatminou
				</Text>
				<HStack align="center" w="100%">
					<Input
						_placeholder={{ color: 'grey' }}
						borderColor="chatminou.primary"
						placeholder={Drysque.name}
						type="email"
						value={name}
						onChange={(e) => setName(e.target.value)}
					/>
					<Text fontSize="20px" fontWeight={700} color="chatminou.primary">
						#
					</Text>
					<Input
						_placeholder={{ color: 'grey' }}
						borderColor="chatminou.primary"
						placeholder={Drysque.tag}
						value={tag}
						onChange={(e) => setTag(e.target.value)}
					/>
					<IconButton
						isLoading={isLoginLoading}
						onClick={submit}
						bg="chatminou.secondary"
						colorScheme="green"
						aria-label="Login"
						icon={<ArrowForwardIcon />}
					/>
				</HStack>
			</VStack>
		</Center>
	);
};
