from channels.routing import route, include

channel_routing = [
    include('tas.routing.channel_routing'),
]
