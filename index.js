const mqtt = require('mqtt'); 
require('dotenv').config();

const port = process.env.MQTT_PORT;
const broker_host = process.env.MQTT_SERVER;
const user_name = process.env.MQTT_USER;
const passwd = process.env.MQTT_PASSWORD;
const idClient = process.env.MQTT_CLIENTID;

const options={
  clientId:idClient,
  username: user_name,
  password:passwd,
  clean:true
};

const client = mqtt.connect(broker_host, options);

client.on("connect",function(){
  console.log("Connected to broker");
});

const {saveTemp, devUpd, checkDev, savePower} = require('./app/controllers/dataController');

client.on("message",function(topic,message,packet){
  var strtopic = topic.split("/");
  var clientID = strtopic[1];
  
  if (strtopic[0] == 'temp') {
    var tempVal = Buffer.from(message,'base64').toString();
    saveTemp(clientID,tempVal);
  }
  if (strtopic[0] == 'power') {
    var jsonpayload = JSON.parse(message);
    //console.log(jsonpayload);
    savePower(clientID,jsonpayload);
  }
  

});
client.subscribe("temp/#",{qos:1});
client.subscribe("power/#",{qos:1});

client.on("error",function(error){
console.log("Can't connect" + error);
});
