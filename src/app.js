const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');


const app = express();
const port = process.env.PORT || 3000;

// define the paths for express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials')


// setup the handlebars
app.set('view engine', '.hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

 // to serve the static contents
app.use(express.static(publicDirectoryPath));

app.get('', (req, res)=> {
    res.render('index',{
        name:'weather-app',
        title: 'Weather'
    });
});

app.get('/about', (req, res)=> {
  
    res.render('about', {
        title : 'About',
        name : 'Ayush'
    });
})

app.get('/help', (req, res)=> {
   
    res.render('help',{
        helpText: 'This is some helpful text.',
        title : 'Help',
        name : 'Ayush'
    });
})

// app.get('', (req, res) => {
//     res.send('<h1> Weather </h1>');
// });

// app.get('/help', (req, res) => {
//     res.send({'name' :'ayush', 'age':23});
// });

// app.get('/about', (req, res) => {
//     res.send('<h1>title page</h1>');
// })
app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send( {
            error : 'Please fill the exact Address'
        })
    }
    geocode(req.query.address, (error, {lat, long, location} = {}) => {
        if (error) {
            console.log('Error', error);
            return res.send({
                error : error
            })
        } else {
           console.log(lat, long, location);
            forecast(lat, long, (error, forecastData) => {
                if (error) {
                   return res.send ( {
                       error : error
                   })
                }
               res.send( {
                   forecast : forecastData,
                   location ,
                   address: req.query.address
               })
                
            })
            
        }
    })
   
})

app.get('/products', (req, res) => {
    if (!req.query.search){
        return res.send( {
           error: 'You must provide the Search term'
        })
    }
    return res.send( {
        products : [],
    })
    
})

app.get('/help/*', (req, res) => {
    res.render('error',{
        message: 'Help article not found',
        name : 'Ayush'
    });
})

app.get('*', (req, res) => {
    res.render('error',{
        message: '404 Error',
        name: 'Ayush'
    });
})

app.listen(port, () => {
    console.log('Server is up on port' + port);
});
