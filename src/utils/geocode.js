const request = require('postman-request')
const geocode = (address,callback)=>{
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1IjoidGVqYW1hcmFtcmVkZHkiLCJhIjoiY2tuNjV2bXhjMGF6NDJ1czZhNnprcDRyMyJ9.WmdcodslvJcTgsTvGgZB2w';
    request({url},(error,response)=>{
        const data = JSON.parse(response.body)
        if(error){
            callback('Unable to provide Weather Data!!',undefined)
            console.log('error')
        }
        else if(data.features.length === 0){
            callback('Can\'t find the location',undefined)
            console.log('no data')
        }
        else{
            callback(undefined,{
                lattitude : data.features[0].center[1],
                longitude : data.features[0].center[0],
                location : data.features[0].place_name
            })
            console.log(data.features[0].center[1])
        }
    
    })
}

module.exports = geocode