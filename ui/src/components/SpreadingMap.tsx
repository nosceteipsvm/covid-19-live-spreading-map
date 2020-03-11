import React, { useEffect } from 'react';
import { Map, TileLayer, GeoJSON } from 'react-leaflet';
import data from '../utilities/worldmap';
import { CStatsI } from '@/interfaces/stats';

interface StatsPropsI {
	stats: CStatsI[];
}

const SpreadingMap: any = ({ stats }: StatsPropsI) => {
	const primaryColor: string = '#131313';
	const secondaryColor: string = '#F1F1F1';
	const highlightColor: string = '#0014f5';

	const customStyle = {
    	stroke: true,
    	color: secondaryColor,
    	weight: .7,
        fill: true,
        fillColor: primaryColor,
        fillOpacity: 1
	};

	const handleFeatureEvents = async (feature: any, layer: any) => {
		const cn: string = feature.properties.sovereignt.toLowerCase();
		const cs: CStatsI = await statsByCountry(cn);
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
				${feature.properties.sovereignt}</br>
				Total cases ${tc !== "" ? tc : "0"}</br>
				Total deaths ${td !== "" ? td : "0"}</br>
				Total recovered ${tr !== "" ? tr : "0"}</br>
			`,
			{ 'maxWidth': '500', 'className' : 'custom' }
		);

		layer.on('mouseover', function () {
			layer.setStyle({
				'fillColor': tc !== undefined ? highlightColor : primaryColor
			});
		});

		layer.on('mouseout', function () {
			layer.setStyle({
				'fillColor': primaryColor
			});
		});
	}

	const statsByCountry = (cn: string): CStatsI => {
		return stats.filter((s: CStatsI) => s.country.toLowerCase() === cn)[0];
	}

	useEffect(() => {
	}, []);

	return (
		<Map
			center={[26, 10]}
			zoom={ 2 }
			attributionControl={false}
			zoomControl={true}
		>
			<GeoJSON
				data={ data }
				style={ customStyle }
				onEachFeature={handleFeatureEvents}
			/>
		</Map>
	)
};

export default SpreadingMap;