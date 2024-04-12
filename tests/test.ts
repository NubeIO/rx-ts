import {
    CommandBuilder,
    PublishTopicBuilder,
    DataType,
    ClientType,
    Type,
    SubscribeTopicBuilder
} from '../command/command';
import { MQTTManager, BrokerConfig } from '../mqttlib/mqtt';
// usage
// npm install -g ts-node
// ts-node test.ts


// Usage
const topic = new PublishTopicBuilder()
    .withVersion("v1")
    .withClientType(ClientType.UI)
    .withTargetUUID("123")
    .withSenderUUID("456")
    .withRequestUUID("789")
    .withDataType(DataType.Plain)
    .withType(Type.Objects)
    .build();

console.log(topic);


// Usage
const subscribeTopic = new SubscribeTopicBuilder()
    .withVersion("v1")
    .withTargetUUID("123")
    .withSenderUUID("456")
    .withRequestUUID("789")
    .withDataType(DataType.Proto)
    .withType(Type.Objects)
    .build();

console.log(subscribeTopic);

const commandOne = new CommandBuilder("RX-2")
    .withArgs(["get", "objects"])
    .withData({
        query: "objects:type == rubix-manager limit:2",
        as: "json"
    })
    .build();


console.log(commandOne);
const commandTwo = new CommandBuilder("RX-21")
    .GetObjectsPagination(10, 10)
    .build();


console.log(commandTwo);
const brokersConfig: Record<string, BrokerConfig> = {
    "broker1": {
        uri: "mqtt://localhost:1883",
        clientId: "client1",
        username: "user1",
        password: "password1"
    }
};
const mqttManager = new MQTTManager(brokersConfig);

// Callback function for handling incoming messages
const messageCallback = (topic: string, message: Buffer) => {
    console.log(`Received message on topic ${topic}: ${message.toString()}`);
};

// Subscribe to a topic using MQTT manager
mqttManager.subscribe("broker1", "topic", messageCallback);

mqttManager.publish("broker1", "topic", JSON.stringify(commandTwo));
