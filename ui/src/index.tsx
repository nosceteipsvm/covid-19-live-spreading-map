import ReactDOM from 'react-dom';
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import './styles/main.scss';
import 'leaflet/dist/leaflet.css';
import App from './App';
import Footer from './Footer';

ReactDOM.render(
		<Router>
			<App />
			<Footer />
		</Router>
	, document.querySelector('#root'));