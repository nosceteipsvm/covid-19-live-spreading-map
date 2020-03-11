from . import app
from .scraper import getData
from flask import jsonify


endpoints = {
	'/': 'List endpoints',
	'/stats': 'Retrieve COVID-19 Analytics'
}


@app.route('/', methods=['GET'])
def landing():
	return jsonify(endpoints), 200


@app.route('/stats', methods=['GET'])
def stats():
	CASES, DEATHS, RECOVERED, LAST_UPDATED, STATS = getData()
	return jsonify(
		last_updated=LAST_UPDATED,
		cases=CASES,
		deaths=DEATHS,
		recovered=RECOVERED,
		stats_by_country=STATS
	), 200