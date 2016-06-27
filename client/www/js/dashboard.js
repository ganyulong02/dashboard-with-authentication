(function () {
  window.startDashboard = function (cb) {
    var client = new Paho.MQTT.Client(
      'm12.cloudmqtt.com',
      34640,
      'web_' + parseInt(Math.random() * 100, 10)
    );

    client.onConnectionLost = onConnectionLost;
    client.onMessageArrived = onMessageArrived;

    var options = {
      useSSL: true,
      userName: "qnrkacay",
      password: "7FR6ueYNE4-C",
      onSuccess: onConnect,
      onFailure: doFail
    };

    client.connect(options);

    // called when the client connects
    function onConnect() {
      // Once a connection has been made, make a subscription and send a message.
      console.log("onConnect");
      client.subscribe("/dashboard");
    }

    function doFail(e){
      console.log(e);
    }

    // called when the client loses its connection
    function onConnectionLost(responseObject) {
      if (responseObject.errorCode !== 0) {
        console.log("onConnectionLost:" + responseObject.errorMessage);
      }
    }

    // called when a message arrives
    function onMessageArrived(message) {
      console.log("onMessageArrived:" + message.payloadString);
      cb(parseFloat(message.payloadString));
    }
  };
})();
