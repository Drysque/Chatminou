import { BrowserRouter as Router, Redirect, Switch } from 'react-router-dom';

import { Header } from 'components/Header';

export const Routes = (): JSX.Element => (
	<Router>
		<Header />
		<Switch>
			<Redirect push to="/" />
		</Switch>
	</Router>
);
