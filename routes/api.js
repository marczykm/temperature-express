var express = require('express');
var ds18b20 = require('ds18b20');
var router = express.Router();

function Temperature(temperature) {
  this.id = '';
  this.datetime = new Date();
  this.celsius = temperature;
}

router.get('/temperature', function(req, res){
  var id = '';
  var temperature = new Temperature();

  if (req.app.get('env') == 'development'){
    temperature.celsius = (Math.random()*100).toFixed(2);
    res.json(temperature);
  } else {
    ds18b20.sensors(function(err, ids){
      temperature.id = ids[0];
      temperature.celsius = ds18b20.temperatureSync(ids[0]);
      res.json(temperature);
    });
  }
});

module.exports = router;
