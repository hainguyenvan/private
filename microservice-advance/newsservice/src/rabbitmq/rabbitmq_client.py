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
        self.channel.exchange_declare(
            exchange='micorservie', exchange_type='fanout')

    def callback(ch, method, properties, body):
        print("[x] Received %r" % body)

    def init_consume(self):
        self.channel.queue_declare(queue='account')
        self.channel.basic_consume(self.callback, queue='account', no_ack=True)
