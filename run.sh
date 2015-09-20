gunicorn  \
    --worker-class socketio.sgunicorn.GeventSocketIOWorker \
    --log-file=- \
    --reload \
    --bind 0.0.0.0:8000 \
    HalliganAvailability.wsgi

