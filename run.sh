gunicorn  \
    --worker-class socketio.sgunicorn.GeventSocketIOWorker \
    --log-file=- \
    --reload \
    HalliganAvailability.wsgi

