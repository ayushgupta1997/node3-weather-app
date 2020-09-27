const request = require('request');

const geocode = (address, callback) => {
    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + encodeURIComponent(address) + ".json?access_token=pk.eyJ1IjoiYXl1c2hndXB0YTE5OTciLCJhIjoiY2tldWNlMnNkM3U1aTJxbnB6cWZqdDBhdyJ9.yX3aYgklcesTavnLkdqrOg&limit=1";
    request({ url, json: true}, (err, {body} = {}) => {
        if (err) {
            callback('Unable to Connect to the location Service', undefined);
        } else if (body.features.length === 0) {
            callback('Unable to Find location Period. Try another Search', undefined);
        } else {
            return callback(undefined, {"lat" :body.features[0].center[1], "long" : body.features[0].center[0], "location" : body.features[0].place_name});
        }
    })
};

module.exports = geocode;