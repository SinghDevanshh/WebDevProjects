const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const app = express();


app.use(bodyParser.urlencoded({extended:true}))

app.get("/",(req,res)=>{
    res.sendFile(__dirname+"/index.html")
})


app.post("/",(req,res)=>{
    var query = req.body.cityName;
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid=a5bd079c831f9ec84021006b5e85989c&units=metric"
    https.get(url,function(response){
        response.on("data",function(data){
            const obj = JSON.parse(data);
            // url =  https://openweathermap.org/img/wn/10d@2x.png
            // <img src=imgUrl ></img>
            imgUrl = "https://openweathermap.org/img/wn/"+obj.weather[0].icon+"@2x.png"
            res.write("<h1>The temp in "+query+" is " + obj.main.temp +" degree celcius. </h1>");
            res.write("<body>The weather description is " + obj.weather[0].description +".</body>")
            res.write("<img src="+imgUrl+">")
            res.send();
            
        })
    })

})



app.listen(3000, function(){
    console.log("Server is running on port 3000");
})