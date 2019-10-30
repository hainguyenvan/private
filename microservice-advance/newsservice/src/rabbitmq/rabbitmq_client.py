import pika
import logging
import threading
import json

from ..conf.constant import Constant
# from ..apps.account.dao import AccountDAO


def callback(ch, method, properties, body):
    try:
        ch.basic_ack(delivery_tag=method.delivery_tag)
        logging.getLogger('logger').info(body)

        body = body.decode('utf8')
        body = json.loads(body)
        type = body.get('type')
        paylod = body.get('payload')
        if type == Constant.TYPE_PAYLOAD_QUEUE_CREATE_ACCOUNT:
        #     # flag = AccountDAO.create_account(
        #     #     paylod.get('id'), paylod.get('name'))
        #     # print(flag)
    except Exception as err:
        logging.getLogger('logger').error(err)


class RabbitMQClient:

    def __init__(self):
        credentials = pika.PlainCredentials(
            Constant.RABBITMQ_USERNAME, Constant.RABBITMQ_PASSWORD)
        parameters = pika.ConnectionParameters(
            Constant.RABBITMQ_URL, 5672, '/', credentials)
        connection = pika.BlockingConnection(parameters)
        self.channel = connection.channel()

    def init_consume(self):
        try:
            print('init consume ======================')
            self.channel.queue_declare(queue=Constant.QUEUE_NEWS, durable=True)
            self.channel.basic_qos(prefetch_count=1)
            self.channel.basic_consume(
                queue=Constant.QUEUE_NEWS, on_message_callback=callback)
            channel_thread = threading.Thread(
                target=self.channel.start_consuming)
            channel_thread.start()
            channel_thread.join(0)
        except Exception as err:
            logging.getLogger('logger').error(err)
