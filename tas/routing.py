from channels.routing import route

from .consumers import websocket_connect, websocket_disconnect

channel_routing = [
    route('websocket.connect', websocket_connect),
    route('websocket.disconnect', websocket_disconnect),
]
