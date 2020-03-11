import os, json, csv
from bs4 import BeautifulSoup
from requests import get

EXPORTS = os.path.join(os.path.dirname(os.path.realpath(__file__)), '../../data/stats.csv')
__URL__ = 'https://www.worldometers.info/coronavirus/'

def getData() -> (str, str, str, str, list):
	r = get(__URL__)
	s = BeautifulSoup(r.text, 'html.parser')

	STATS = []
	LAST_UPDATED = s.find('div', {'class':'content-inner'}).find_all('div')[1].text
	counters = [i.select_one("span").text.rstrip() for i in s.find_all(id="maincounter-wrap")]
	CASES = counters[0].replace(',','.')
	DEATHS = counters[1].replace(',','.')
	RECOVERED = counters[2].replace(',','.')

	CASES_BY_COUNTRY = [i.find_all("td") for i in s.find('tbody').find_all("tr")]

	for country in CASES_BY_COUNTRY[0:len(CASES_BY_COUNTRY)-1]:
		cn = country[0].text.rstrip(' ').lstrip(' ')
		tc = country[1].text.replace(' ','').replace('+','').replace(',','.')
		td = country[3].text.replace(' ','').replace('+','').replace(',','.')
		tr = country[6].text.replace(' ','').replace('+','').replace(',','.')
		STATS.append({'country': cn, 'total_cases': tc, 'total_deaths': td, 'total_recovered': tr })

	return CASES, DEATHS, RECOVERED, LAST_UPDATED[14:], STATS

def exportData() -> None:
	_s = getData()
	stats_by_country = _s[4]

	with open(EXPORTS, 'w') as f:
		f.write('COUNTRY, CASES, DEATHS, RECOVERED\n')
		for stats in stats_by_country:
			writer = csv.DictWriter(f, stats.keys())
			writer.writerow(stats)