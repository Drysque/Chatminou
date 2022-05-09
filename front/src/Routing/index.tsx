import { BrowserRouter as Router, Redirect, Switch, Route } from 'react-router-dom';

import { Header } from 'components/Header';

export const Routes = (): JSX.Element => (
	<Router>
		<Header />
		<Switch>
			<Redirect push to="/" />
		</Switch>
	</Router>
);
