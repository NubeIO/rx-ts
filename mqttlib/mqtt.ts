import * as mqtt from 'mqtt';

interface BrokerConfig {
    uri: string;
    clientId?: string;
    username?: string;
    password?: string;
}

class MQTTManager {
    private brokers: Map<string, mqtt.MqttClient> = new Map();

    constructor(brokersConfig: Record<string, BrokerConfig>) {
        Object.keys(brokersConfig).forEach(key => {
            const config = brokersConfig[key];
            const client = mqtt.connect(config.uri, {
                clientId: config.clientId,
                username: config.username,
                password: config.password
            });
            this.brokers.set(key, client);
        });
    }

    publish(brokerName: string, topic: string, message: string | Buffer) {
        const broker = this.brokers.get(brokerName);
        if (!broker) {
            throw new Error(`Broker ${brokerName} not found`);
        }
        broker.publish(topic, message);
    }

    subscribe(brokerName: string, topic: string, callback: (topic: string, message: Buffer) => void) {
        const broker = this.brokers.get(brokerName);
        if (!broker) {
            throw new Error(`Broker ${brokerName} not found`);
        }
        broker.subscribe(topic, (err) => {
            if (err) {
                throw new Error(`Subscribe to topic ${topic} failed: ${err.message}`);
            }
        });
        broker.on('message', callback);
    }
}

export { MQTTManager, BrokerConfig };
