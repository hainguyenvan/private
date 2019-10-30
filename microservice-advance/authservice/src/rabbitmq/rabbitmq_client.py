import pika
import logging

from ..conf.constant import Constant


class RabbitMQClient:

    def __init__(self):
        credentials = pika.PlainCredentials(
            Constant.RABBITMQ_USERNAME, Constant.RABBITMQ_PASSWORD)
        parameters = pika.ConnectionParameters(
            Constant.RABBITMQ_URL, 5672, '/', credentials)
        connection = pika.BlockingConnection(parameters)
        self.channel = connection.channel()

    def send_to_queue(self, queue, payload):
        try:
            self.channel.queue_declare(queue=queue, durable=True)
            self.channel.basic_publish(
                exchange='', routing_key=queue, body=payload)
        except Exception as err:
            logging.getLogger('logger').error(err)
