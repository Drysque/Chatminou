import { Redirect, Route } from 'react-router-dom';

import { useGetAccountQuery } from 'services/henrikApi/account';
import { useAppSelector } from 'services/hooks';

interface PrivateRouteProps {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	component: (...args: any[]) => JSX.Element;
	[key: string]: unknown;
}

export const PrivateRoute = ({ component: Component, ...rest }: PrivateRouteProps): JSX.Element => {
	const tagline = useAppSelector((state) => state.auth.tagline);
	const { isSuccess } = useGetAccountQuery(tagline!, { skip: !tagline });

	return (
		<Route
			{...rest}
			render={(routeProps) => (isSuccess ? <Component {...routeProps} /> : <Redirect push to="/login" />)}
		/>
	);
};
