//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js");
const mongoose = require('mongoose');
const _ = require("lodash");

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

mongoose.connect('mongodb://localhost:27017/todoListDB',{useNewUrlParser : true});

const itemsSchema = new mongoose.Schema({
  name: String
});

const Item = mongoose.model('Item', itemsSchema);

const item1 = new Item({ name: 'Welcome to your todolist!' });

const item2 = new Item({ name: 'Hit the + button to add a new item' });

const item3 = new Item({ name: '<--- Hit this to delete an item' });

const defaultItems = [item1,item2,item3];

const listSchema = new mongoose.Schema({
  name: String,
  items : [itemsSchema]
});

const List = mongoose.model('List', listSchema);

app.get("/", function(req, res) {

    const day = date.getDate();
    Item.find({}).then(function(foundItems){
      if (foundItems.length === 0){
        Item.insertMany(defaultItems).then(function(){
          console.log("Items added successfully");
        })
        .catch(function(err){
          console.log(err);
        });
        res.redirect("/")
      }
      else{
        res.render("list", { listTitle: day, newListItems: foundItems });
      }
    })
    .catch(function(err){
      console.log(err);
    });


});

app.post("/", function(req, res){
    const day = date.getDate();
    const listName = req.body.list;
    const newItem = new Item({ name: req.body.newItem});
    if (listName === day){
      newItem.save();
      res.redirect("/");
    }
    else{
      List.findOne({name:listName})
      .then((foundlist) => {
        foundlist.items.push(newItem);
        foundlist.save();
        res.redirect("/"+listName);
      })
      .catch((err) => console.log(err));
    }
});

app.post("/delete", async function(req, res){
  const day = date.getDate();
  const itemName = req.body.checkbox;
  const listname = req.body.listname;
  if (listname === day){
    Item.deleteOne({name:itemName}).then(function(){
      console.log("Data deleted"); // Success
    }).catch(function(error){
        console.log(error); // Failure
    });
    res.redirect("/");
  }
  else{
    let foundList = await List.findOne({name: listname}).exec();
    foundList.items.pull({name: itemName});
    foundList.save();
    return res.redirect("/"+listname);
  }
});


app.get("/:newListname", function(req,res){
  const newListname = _.capitalize(req.params.newListname);
  List.findOne({name:newListname})
      .then((foundlist) => {
        if (!foundlist){
          const list = new List({
            name:newListname,
            items:defaultItems
          })
          list.save();
          res.redirect("/"+newListname);
        }
        else{
          res.render("list", { listTitle: foundlist.name, newListItems: foundlist.items });
        }
      })
      .catch((err) => console.log(err));
});

app.get("/about", function(req, res){
  res.render("about");
});

app.listen(3000, function() {
  console.log("Server started on port 3000");
});
