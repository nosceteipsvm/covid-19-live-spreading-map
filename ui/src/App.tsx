import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Landing from './components/Landing';
import FourOhFour from './components/FourOhFour';

const App: React.FC = () => {
	return (
		<Switch>
			<Route exact path='/' component={Landing} />
			<Route component={FourOhFour} />
		</Switch>
	)
}

export default App;