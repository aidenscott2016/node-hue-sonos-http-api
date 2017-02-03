'use strict';
const logger = require('sonos-discovery/lib/helpers/logger');

function redLight(player, values){
  logger.info("player: " + player + "\n values: " + values);
  return Promise.resolve();
}

module.exports = function (api) {
  api.registerAction('redlight', redLight);
}