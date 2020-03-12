export interface GStatsI {
	cases: string;
	deaths: string;
	last_updated: string;
	recovered: number;
	stats_by_country: CStatsI[];
}

export interface CStatsI {
	country: string;
	total_cases: string;
	total_deaths: string;
	total_recovered: string;
}