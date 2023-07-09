const express = require("express");
const bodyParser = require("body-parser");
let items = ["Buy Food" , "Cook Food" , "Eat Food"];
let Workitems = [];
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(express.static("public"));

app.get("/", (req,res)=>{
    let options = { weekday: 'long', month: 'long', day: 'numeric' };
    let today  = new Date();
    let dateFromat = today.toLocaleDateString("en-US", options);
    res.render("list",{listTitle : dateFromat , newListItem : items});
})

app.get("/work", (req,res)=>{
    res.render("list",{listTitle : "Work List" , newListItem : Workitems});
})


app.post("/",(req,res)=>{
    let item = req.body.newItem;
    if (req.body.list === "Work"){
        Workitems.push(item);
        res.redirect("/work");
    }
    else{
        items.push(item);
        res.redirect("/");
    }
})

app.listen(3000,function(){
    console.log("Serevr is runing on port 3000");
})