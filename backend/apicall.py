'''
class for calling the yelp api
'''
import argparse
import os
import json
import requests
import sys
import urllib
from urllib.error import HTTPError
from urllib.parse import quote
from urllib.parse import urlencode

'''
categories: use the lower case version in actual api call

coffee
pizza
comfortfood
breweries
italian
chinese
Fast Food (hotdogs, All) 
 '''



# API constants
API_HOST = 'https://api.yelp.com'
SEARCH_PATH = '/v3/businesses/search'

class Yelp:
    def __init__(self):
        pass        

    '''
    calls the yelp api 
    '''
    def search_nearby(search_limit,term,lat,lng):
        data = "api call!"
        url_params = {
           'term': term.replace(' ', '+'),
            'latitude':lat,
            'longitude':lng,
            'open_now':True,
            'limit': search_limit
        }
        print(url_params)
        return find(API_HOST, SEARCH_PATH, url_params=url_params)

    def search_by_id(id):
        restDetailsData = "api call2"
        BUSINESS_PATH = '/v3/businesses/'
        BUSINESS_PATH+= id
        return find(API_HOST, BUSINESS_PATH, url_params=id)

    def search_nearby_for_type(search_limit,lat,lng,cat):
        data = "api call!"
        url_params = {
            'latitude':lat,
            'longitude':lng,
            'open_now':True,
            'categories':cat,
            'limit': search_limit
        }
        print(url_params)
        return find(API_HOST, SEARCH_PATH, url_params=url_params)


'''
helper function
'''
def find(host, path, url_params=None):
    API_KEY = os.environ['API_KEY']
    url_params = url_params or {}
    url = '{0}{1}'.format(host, quote(path.encode('utf8')))
    headers = {
        'Authorization': 'Bearer %s' % API_KEY,
    }
    print(u'Querying {0} ...'.format(url))
    response = requests.request('GET', url, headers=headers, params=url_params)
    response_code = response.status_code
    if response_code == 200:
        print("response ok %s"%response_code)
    else:
        print("ERROR!: %s"%response_code)
    return response.json()

