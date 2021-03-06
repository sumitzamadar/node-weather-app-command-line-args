const request = require('request');

const geocode = (address, callback) => {
    const key = ''; //use your private key to access the mapbox api
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address) +'.json?access_token='+ key +'&limit=1';
    
    request({url, json: true}, (error, response) => {
        const { body } = response;
        if (error) {
            callback('Unable to connect to location service!');
        } else if (!body.features.length) {
           callback('Unable to get location!');
        } else {
            const feature = body.features[0];
            callback(undefined, {
                latitude: feature.center[1],
                longitude: feature.center[0],
                address: feature.place_name
            });
        }
    });
};

module.exports = geocode;
