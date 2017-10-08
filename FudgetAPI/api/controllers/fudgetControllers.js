'use strict';
var bodyParser = require('body-parser')

var mongoose = require('mongoose'),
  Item = mongoose.model('Items');

exports.list_all_items = function(req, res) {
  Item.find({}, function(err, items) {
    if (err)
      res.send(err);
    res.json(items);
  });
};

exports.list_sorted_items = function(req, res) {
  console.log(req.body);
  Item.find(req.body, function(err, items) {
    if (err)
      res.send(err);
    res.json(items);
  });
};

exports.create_an_item = function(req, res) {
  var new_item = new Item(req.body);
  new_item.save(function(err, items) {
    if (err)
      res.send(err);
    res.json(items);
  });
};


exports.read_an_item = function(req, res) {
  Item.findById(req.params.itemId, function(err, items) {
    if (err)
      res.send(err);
    res.json(items);
  });
};


exports.update_an_item = function(req, res) {
  Item.findOneAndUpdate({_id: req.params.itemId}, req.body, {new: true}, function(err, items) {
    if (err)
      res.send(err);
    res.json(items);
  });
};


exports.delete_an_item = function(req, res) {
  Item.remove({
    _id: req.params.itemId
  }, function(err, items) {
    if (err)
      res.send(err);
    res.json({ message: 'Item successfully deleted' });
  });
};

exports.read_receipt = function(req, res) {
  //array of json objects
  var jsonOfItems = [];
  console.log(req.body);
  var TA = req.body.responses[0].textAnnotations;
  console.log(TA);
  var storeLocation = TA[1].description; //the first element is always the store
  var dateOfPurchase = new Date(); //date of purchase
  var dollars;
  var cents;
  var value = 0;
  for(var i=0 ; i<TA.length ; i++) {
    var j = i; //j is a temp counter
    //add value after dollar sign
    if(TA[i].description === "$") {
      dollars = 0;
      cents = 0;
      console.log("$");
      j++;
      while(Number(TA[j].description)) {
        console.log(TA[j].description);
        dollars += Number(TA[j].description);
        j++;
      }//add cents if there is a decimal
      if(TA[j].description === ".") {
        j++;
        while(Number(TA[j].description)) {
          console.log(TA[j].description);
          cents += Number(TA[j].description);
          j++;
        }
      }
      value = dollars + (cents/100);
      console.log(value); //prints dollar value

      //if there is a $ sign, print the word that comes before the $ amount.
      if (i-1 >= 0) {
        var itemName = TA[i-1].description;
        console.log(itemName);
      }      
      //at this point, there is enough info to make a json object

      //set category. Use NLP later for better classification
      if(store_location === 'Target') {
        category = 'Groceries';
      }
      else if(store_location === 'Starbucks'){
        category = 'Coffee';
      }
      else if(store_location === '') {

      }
      var itemDetails = {
        name : itemName,
        date_bought: dateOfPurchase,
        price: value,
        store_location: storeLocation
      };  
      //store this json into an array NOT SURE IF THIS IS CORRECT
      if(itemDetails.name != "total") {
        jsonOfItems.push(itemDetails);
      }
    }
    i = j;
  }
  var out = jsonOfItems;
  console.log(out);
  res.setHeader("Content-Type", "application/json");
  res.json(out);
}
