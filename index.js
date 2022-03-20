const aedes = require('aedes')()
const server = require('net').createServer(aedes.handle)
const port = 1883
const mqtt = require('mqtt')
require('dotenv').config();

const broker_host = process.env.MQTT_SERVER;

server.listen(port, function () {
    console.log('server started and listening on port ', port)
  })

const client  = mqtt.connect({ port: 1883, host: broker_host, keepalive: 10000})
client.on('connect', function () {
  client.subscribe('presence', function (err) {
    if (!err) {
      client.publish('presence', 'Hello mqtt')
    }
  })
})

client.on('message', function (topic, message) {
  // message is Buffer
  console.log(topic.toString())
  console.log(message.toString())
  client.end()
})