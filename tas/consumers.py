import logging
logger = logging.getLogger(__name__)


def websocket_connect(message):
    logger.debug('Websocket connected: %s', message)


def websocket_disconnect(message):
    logger.debug('Websocket disconnected: %s', message)
