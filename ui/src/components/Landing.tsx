import React, { useState, useEffect } from 'react';
import { Map, TileLayer, GeoJSON } from 'react-leaflet';

import { CStatsI } from '../interfaces/stats';
import SpreadingMap from './SpreadingMap';


const Landing: React.FC = () => {
	const api_endpoint: string = '//mighty-lake-71108.herokuapp.com/stats';
	const [loading, updateLoading] = useState<boolean>(true);
	const [lastUpdated, setLastUpdated] = useState<string>('');	
	const [globalCases, setGlobalCases] = useState<string>('');
	const [globalDeaths, setGlobalDeaths] = useState<string>('');
	const [globalRecovered, setGlobalRecovered] = useState<string>('');
	const [stats, setStats] = useState<CStatsI[]>([]);

	const getData = async () => {
		await fetch(api_endpoint)
			.then(res => res.json())
			.then(json => {
				setGlobalCases(json.cases);
				setGlobalDeaths(json.deaths);
				setLastUpdated(json.last_updated);
				setGlobalRecovered(json.recovered);
				setStats(json.stats_by_country);
				updateLoading(false);
			})
			.catch(err => console.log(err));
	}

	useEffect(() => {
		getData();
	}, []);

	return (
		<div className="flex flex-col justify-center items-center w-full h-full p-4">
			<h1 className="text-3xl font-black text-gray-200 py-4 my-4 text-center">
				Coronavirus Live Spreading Map 🌎
			</h1>
			{ loading && loading ? (
				<div className="flex flex-col justify-center items-center p-6"
					 style={{
					 	minHeight: "60vh"
					 }}
				>
					<div className="spinner">
					  <div className="double-bounce1"></div>
					  <div className="double-bounce2"></div>
					</div>
					<p className="text-sm font-light text-gray-600 p-2">
						Fetching data, please wait
					</p>
				</div>
			) : (
				<>
					<div className="w-full flex flex-col md:flex-row justify-center items-center mb-6" id="showcase">
						<span className="my-3 mx-6 inline-block text-center">
							<h1 className="text-2xl font-black my-1 uppercase"
								style={{
									color: '#f1bda5'
								}}
							>
								cases
							</h1>
							<h1 className="text-5xl font-black text-gray-300 my-1">
								{ globalCases && globalCases }
							</h1>
						</span>
						<span className="my-3 mx-6 inline-block text-center">
							<h1 className="text-2xl font-black my-1 uppercase"
								style={{
									color: '#f1bda5'
								}}
							>
								deaths
							</h1>
							<h1 className="text-5xl font-black text-gray-300 my-1" id="deaths">
								{ globalDeaths && globalDeaths }
							</h1>
						</span>
						<span className="my-3 mx-6 inline-block text-center">
							<h1 className="text-2xl font-black my-1 uppercase"
								style={{
									color: '#f1bda5'
								}}
							>
								recovered
							</h1>
							<h1 className="text-5xl font-black text-gray-300 my-1" id="recovered">
								{ globalRecovered && globalRecovered }
							</h1>
						</span>
					</div>
					<p className="text-sm font-light text-gray-500 my-6 text-center">
						Click on countries to display details.
					</p>
			        <SpreadingMap stats={stats} />
					<p className="text-lg font-light text-gray-400 my-12 text-center">
						Last updated { lastUpdated && lastUpdated }
					</p>
				</>
			)}
		</div>
	)
};

export default Landing;