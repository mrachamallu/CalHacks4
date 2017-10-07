'use strict';


var mongoose = require('mongoose'),
  Item = mongoose.model('Items');

exports.list_all_items = function(req, res) {
  Item.find({}, function(err, items) {
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
  Item.findById(req.params.taskId, function(err, items) {
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

//array of json objects
var jsonOfItems = [];
exports.read_receipt = function(req, res) {
  var TA = req.body.textAnnotations;
  console.log(TA);
  var storeLocation = TA[0].description; //the first element is always the store
  var dateOfPurchase = new Date(); //date of purchase
  for(var i=0 ; i<TA.length ; i++) {
    int j = i; //j is a temp counter
    //add value after dollar sign
    if(TA[i].description === "$") {
      console.log("$");
      var dollars = 0;
      var cents = 0;
      j++;
      while(Number(TA[i].description)) {
        console.log(TA[i].description);
        dollars += Number(TA[i].description);
        j++;
      }//add cents if there is a decimal
      if(TA[i].description === ".") {
        j++;
        while(Number(TA[i].description)) {
          console.log(TA[i].description);
          cents += Number(TA[i].description);
          j++;
        }
      }
      //if there is a $ sign, print the word that comes before the $ amount.
      if (i-1 >= 0) {
        var itemName = TA[i-1].description;
        console.log(itemName);
      }      
      var value = dollars + (cents/100);
      console.log(value); //prints dollar value

      //at this point, there is enough info to make a json object
      var itemDetails = {
        name : itemName,
        date_bought: dateOfPurchase,
        price: value,
        store_location: storeLocation
      };  
      //store this json into an array NOT SURE IF THIS IS CORRECT
      jsonOfItems.push(itemDetails);
    }
    i = j;
  }


  res.json({message: "Body printed to console"});
}
