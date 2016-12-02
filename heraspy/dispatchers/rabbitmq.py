import pika
import json
def get_rabbitmq_dispatcher(amqps_url=None, pika_connection=None, queue=None):

    connection = (
        pika.BlockingConnection(pika.URLParameters(amqps_url))
        if pika_connection is None
        else pika_connection
    )

    channel = connection.channel()
    channel.queue_declare(queue=queue)

    def dispatch(model_key, event, data):
        channel.basic_publish(
            exchange='',
            routing_key=queue,
            body=json.dumps({
                'event': event,
                'model': model_key,
                'data': data
            })
        )

    return dispatch
