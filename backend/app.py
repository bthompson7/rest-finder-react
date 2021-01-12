import time,os,json
import threading
from apicall import Yelp
from flask import Flask,render_template, jsonify,request,Response

#twisted
from twisted.internet import reactor
from twisted.web.proxy import ReverseProxyResource
from twisted.web.resource import Resource
from twisted.web.server import Site
from twisted.web.wsgi import WSGIResource
from flask_cors import CORS

app = Flask(__name__)
app.debug = False
CORS(app)

#eventually => API_KEY = os.environ['API_KEY'] to hide the API key in a production system like heroku, aws etc...
API_KEY = 'fmChFJUPUIcL7nfSRgcW8mnOPLHII5qnGvzvPh9E9fr2zXck2xNVFdOWjKzCn8qTt6mkdg1INZOrCh78rmI8nDoktA9hJaBlgHYrdRbAO83z2_qMtSQzfOtdNhdlXnYx'


print("Starting Up...")
MAX_RESULTS = 50

@app.route('/restaurant/<string:id>', methods=['POST'])
def displayRestaurantDetails(id):
    someData = id
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

resource = WSGIResource(reactor, reactor.getThreadPool(), app)
site = Site(resource)
reactor.listenTCP(3001, site)
reactor.run()