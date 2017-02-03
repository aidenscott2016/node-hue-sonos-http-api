'use strict';
const logger = require('sonos-discovery/lib/helpers/logger');

function redLight(player, values){
    logger.info("player: " + player + "\n values: " + values);
    return Promise.resolve();
}

function processVoice(player, values){
    logger.info("player: " + player + "\n values: " + values);
    var message = values[0];
    sayMessage(player, values[0]);

    return Promise.resolve();
}

function processError(player, values){
    logger.info("player: " + player + "\n values: " + values);

    sayMessage(player, values[1]);

    switch (values[0])
    {
        case "secure_error_log":
            lights("red");
            break;
        case "test_error_log":
            lights("blue")
            break;
        case "demo_error_log":
            lights("yellow");
            break;
        case "staging_error_log":
            lights("blue");
            break;
        case "unknown":
            lights("orange");
            break;
        default:
            lights("pink");
    }

    return Promise.resolve();
}

function sayMessage(player, message){
    //message = encodeURI(message);

    var request = require('http');

    var options = {
        host: "localhost",
        port: 5005,
        path: "/Office/say/" + message + "/Brian/60"
    };

    request.get(options, function(resp){

    }).on("error", function(e){
        logger.info("Error: " + e.message);
    });
}

function lights(colour){

}



module.exports = function (api) {
    api.registerAction('redlight', redLight);
    api.registerAction('voice', processVoice);
    api.registerAction('error', processError);
}