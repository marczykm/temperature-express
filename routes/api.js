var express = require('express');
var ds18b20 = require('ds18b20');
var router = express.Router();

function Temperature() {
  this.datetime = '';
  this.celsius = '';
}

router.get('/test', function(req, res){
  var id = '';
  ds18b20.sensors(function(err, ids){
    id = ids[0];
  });

  var temperature = new Temperature();
  temperature.datetime = new Date();
  temperature.celsius = ds18b20.temperatureSync(id);

  res.json(temperature);
});

module.exports = router;
