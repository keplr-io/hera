process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0';
import chalk from 'chalk';
import amqp from 'amqplib';
import appEvents from './app-events';

export function applyAmqpCtl(io, { amqpUrl, amqpQueue }) {

    amqp.connect(amqpUrl)
        .then(conn => conn.createChannel())
        .then(ch => {
            ch.assertQueue(amqpQueue, { durable: false });

            console.log(
                chalk.yellow(
                    `Waiting for messages in ${amqpQueue}`
                )
            );

            ch.consume(
                amqpQueue,
                msg => {
                    try {
                        const { event, model, data } = JSON.parse(msg.content.toString());
                        if (appEvents[event]) {
                            io.sockets.emit(event, {
                                model,
                                data
                            });
                        }
                    } catch (e) {
                        console.error(
                            chalk.red('corrupt message', e)
                        );
                    }
                },
                { noAck: true }
            );

        }).catch(console.warn);
}
