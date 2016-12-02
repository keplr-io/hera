process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0';
import amqp from 'amqplib';
import appEvents from './app-events';

export function applyAmqpCtl(io, { amqpUrl, amqpQueue }) {

    amqp.connect(amqpUrl)
        .then(conn => conn.createChannel())
        .then(ch => {
            ch.assertQueue(amqpQueue, { durable: false });

            console.log(` [*] Waiting for messages in ${amqpQueue}`);

            ch.consume(
                amqpQueue,
                msg => {
                    try {
                        const { event, model, data } = JSON.parse(msg.content.toString());
                        if (appEvents[event]) {
                            io.sockets.emit(event, {
                                model,
                                data
                            })
                        }
                    } catch (e) {
                        console.log('corrupt message', e);
                    }
                },
                { noAck: true }
            );

        }).catch(console.warn);
    }
