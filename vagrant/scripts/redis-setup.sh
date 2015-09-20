add-apt-repository ppa:chris-lea/redis-server -y
apt-get update -y
apt-get install redis-server -y 
usermod -a -G redis vagrant

mkdir -p /etc/redis
cp /home/vagrant/HalliganHelper/vagrant/confs/redis.conf /etc/redis/redis.conf

service redis-server restart
