request = require('request');

const forecast = (lat, long, callback) => {
    //console.log(lat);
    //console.log(long);
    const url = "http://api.weatherstack.com/current?access_key=f498e3733265822f095b80810806e18b&query=%22Delhi%22&units=f"

    request({ url, json :true}, (err, {body}={}) => {
        if (err) {
            callback('Unable to connect to weather service', undefined);
        } else if (body.err) {
            callback('Unable to find location', undefined);
        } else {
            callback(undefined, `${body.current.weather_descriptions[0]} .It is currently ${body.current.temperature} degrees out. It feels like ${body.current.feelslike} degrees out.`);
        }
       
    })

}
module.exports = forecast;