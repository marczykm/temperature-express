var express = require('express');
var ds18b20 = require('ds18b20');
var router = express.Router();

function Temperature(temperature) {
  this.datetime = new Date();
  this.celsius = temperature;
}

router.get('/temperature', function(req, res){
  var id = '';
  var temperature = new Temperature();
  if (req.app.get('env') === 'development'){
    temperature.celsius = 99;
    res.json(temperature);
  }

  if(req.app.get('env') !== 'development'){
    ds18b20.sensors(function(err, ids){
      temperature.celsius = ds18b20.temperatureSync(ids[0]);
      res.json(temperature);
    });
  }
});

module.exports = router;
