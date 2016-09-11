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
  }

  if(req.app.get('env') !== 'development'){
    ds18b20.sensors(function(err, ids){
      console.log(ids[0]);
      id = ids[0];
      temperature.celsius = ds18b20.temperatureSync(id);
      console.log(temperature);
    });
  }

  res.json(temperature);
});

module.exports = router;
