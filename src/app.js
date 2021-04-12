const express = require('express')
const path = require('path')
const app = express()
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const port = process.env.PORT || 3003
const publicDirectoryPath = path.join(__dirname,'../public')
app.use(express.static(publicDirectoryPath))
const views = path.join(__dirname,'../views')
const partialview = path.join(__dirname,'../views/partials')
app.set('view engine','hbs')
app.set('views',views)
hbs.registerPartials(partialview)
app.get('',(req,res)=>{
    res.render('index',{
        title:'Weather App',
        name:'Created by RaviTeja'
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About',
        name:'RT'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        title:'Help',
        name: 'tejamaramreddy@gmail.com'
    })
})
app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error : 'You must provide address!!'
        })
    }
    // res.send({
    //     location : req.query.address
        
    // })
   geocode(req.query.address,(error, { lattitude, longitude, location }={})=>{
    if (error) {
        return res.send({
            error : 'You must provide an correct address'
        })
    }
    console.log(lattitude, longitude)
    forecast(lattitude, longitude, (error, forecastData) => {
        if (error) {
            return console.log(error)
        }

      res.send({
          forecast : forecastData,
          location,
          address : req.query.address
      })
    })

   })
})
app.get('*',(req,res)=>{
    res.send('<h1 align="center">404 Page Not found</h1>')
})
app.listen(port,()=>{

    console.log('Server is up and running in port '+ port)
})