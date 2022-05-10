import { BrowserRouter as Router, Redirect, Switch, Route } from 'react-router-dom';

import { Header } from 'components/Header';
import { Login } from 'pages/auth/Login';
import { PrivateRoute } from './PrivateRoute';
import { Home } from 'pages/Home';
import { Profile } from 'pages/auth/Profile';

export const Routes = (): JSX.Element => (
	<Router>
		<Header />
		<Switch>
			<PrivateRoute exact path="/" component={Home} />
			<PrivateRoute exact path="/profile" component={Profile} />
			<Route path="/login" component={Login} />

			<Redirect push to="/login" />
		</Switch>
	</Router>
);
