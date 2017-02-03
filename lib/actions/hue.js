'use strict';
const logger = require('sonos-discovery/lib/helpers/logger');
const hue = require("node-hue-api");
const HueApi = hue.HueApi;
const LightState = hue.lightState;

const delay = (fn, timeout) => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(fn()), timeout);
  });
};

function redLight(player, values){
  logger.info("player: " + player + "\n values: " + values);
  return Promise.resolve();
}


function displayResult(result) {
  logger.info(JSON.stringify(result, null, 2));
}

function light() {
  let hostname = "192.168.1.135",
      username = "gabTiZJrtGC7jiAjk09sn9VYIsuMIrKFRQYyxno4",
      api;

  api = new HueApi(hostname, username);

  api.lightStatus(1)
    .then(function (old) {
      let oldLightStatus = LightState.create()
        .on(old.state.on)
        .hue(old.state.hue)
        .sat(old.state.sat)
        .bri(old.state.bri);

      let alert =  LightState.create().on().hue(65280).sat(254).bri(100).alert("select");
      api.setGroupLightState(0, alert)
        .then(delay(function () {
          api.setGroupLightState(0, oldLightStatus)
            .then(displayResult)
            .done()
        }, 2000))
        .done();
    })
    .done()




  return Promise.resolve();
}



module.exports = function (api) {
  api.registerAction('redlight', redLight);
  api.registerAction('blue', light);
}