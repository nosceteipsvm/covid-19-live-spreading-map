import React from 'react';
import { Map, TileLayer, GeoJSON } from 'react-leaflet';
import data from '../utilities/worldmap';
import { CStatsI } from '../interfaces/stats';

interface StatsPropsI {
	stats: CStatsI[];
}

const SpreadingMap: any = ({ stats }: StatsPropsI) => {
	const primaryColor: string = '#210881';
	const secondaryColor: string = '#d72eef';
	const highlightColor: string = '#562eef';

	const setStyle = (feature: any) => {
		const cn: string = feature.properties.sovereignt.toLowerCase();

		return {
			stroke: true,
			color: secondaryColor,
			weight: .9,
			fill: true,
			fillColor: statsByCountry(cn) !== undefined ? highlightColor : primaryColor,
			fillOpacity: 1
		}		
	}

	const handleFeatures = async (feature: any, layer: any) => {
		const cn: string = feature.properties.sovereignt;
		const cs: CStatsI = await statsByCountry(cn.toLowerCase());
		let tc: string = "";
		let td: string = "";
		let tr: string = "";

		if (cs) {
			tc = cs.total_cases;
			td = cs.total_deaths;
			tr = cs.total_recovered; 
		}

		await layer.bindPopup(
			`
				${cn}</br>
				Total cases ${tc !== "" ? tc : "0"}</br>
				Total deaths ${td !== "" ? td : "0"}</br>
				Total recovered ${tr !== "" ? tr : "0"}</br>
			`,
			{ 'maxWidth': '500', 'className' : 'custom' }
		);
	}

	const statsByCountry = (cn: string): CStatsI => {
		return stats.filter((s: CStatsI) => s.country.toLowerCase() === cn)[0];
	}

	return (
		<Map
			center={[26, 10]}
			zoom={ 2 }
			attributionControl={false}
			zoomControl={true}
		>
			<GeoJSON
				data={ data }
				style={ setStyle }	
				onEachFeature={ handleFeatures }
			/>
		</Map>
	)
};

export default SpreadingMap;