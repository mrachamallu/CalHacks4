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

exports.read_receipt = function(req, res) {
  var TA = req.body.textAnnotations;
  console.log(TA);
  for(var i=0 ; i<TA.length ; i++) {
    if(TA[i].description === "$") {
      console.log("$");
      var dollars = 0;
      var cents = 0;
      i++;
      while(Number(TA[i].description)) {
        console.log(TA[i].description);
        dollars += Number(TA[i].description);
        i++;
      }
      if(TA[i].description === ".") {
        i++;
        while(Number(TA[i].description)) {
          console.log(TA[i].description);
          cents += Number(TA[i].description);
          i++;
        }
        //intead of i++ above, can you use a temp variable? bc im printing i-1 for the word before
      if (i-1 >= 0) {console.log(TA[i-1].description)} //if there is a $ sign, print the word that comes before the $ amount.
      }
      var value = dollars + (cents/100);
      console.log(value); //prints dollar value
    }
  }

  res.json({message: "Body printed to console"});
}
