import time,os,json
import threading
from apicall import Yelp
from flask import Flask,render_template, jsonify,request,Response

from flask_cors import CORS

app = Flask(__name__, static_folder='./build', static_url_path='/')
app.debug = False
CORS(app)

print("Starting Up...")
MAX_RESULTS = 50

@app.route('/')
def index():
    return app.send_static_file('index.html')

@app.errorhandler(404)
def not_found(e):
    return app.send_static_file('index.html')

@app.route('/restaurant/<string:id>', methods=['POST'])
def displayRestaurantDetails(id):
    api = Yelp
    dataFromApi = api.search_by_id(id)
    restHasHoursListed = True
    try:
        print(dataFromApi['hours'][0]['is_open_now'])
    except:
        restHasHoursListed = False
    print(dataFromApi)
    return dataFromApi


@app.route('/getData', methods=['POST'])
def getdata():
    restData = request.get_json()
    print("/getData called")
    api = Yelp
    lat = restData['lat']
    lng = restData['lng']

    if restData['type'] == 'rest': #rest means breakfast, lunch,dinner
        meal_type = restData['meal_type']
        dataFromApi = api.search_nearby(MAX_RESULTS,meal_type,lat,lng)
        
    elif restData['type'] == 'food': #a specific food type like chinese,burgers etc...
        food = restData['data']
        dataFromApi = api.search_nearby_for_type(MAX_RESULTS,lat,lng,food)
    json.dumps(dataFromApi)

    restList = []
    for nearby_restaurant in dataFromApi['businesses']:
            restList.append(nearby_restaurant)
    
    response = Response(json.dumps(restList),  mimetype='application/json')
    return response

if __name__ == '__main__':
        app.run(port=3001)