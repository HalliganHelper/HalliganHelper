# -*- mode: ruby -*-
# vi: set ft=ruby :

Vagrant.configure(2) do |config|

  config.vm.box = "ubuntu/trusty64"
  config.vm.hostname = "HH"

  #Load the HalliganHelper source code
  config.vm.synced_folder ".", "/home/vagrant/HalliganHelper"
  config.vm.provision "file", source: "~/.gitconfig", destination: ".gitconfig"

  config.vm.provision "shell", path: "vagrant/scripts/postgres.sh", name: "Postgres"
  config.vm.provision "shell", path: "vagrant/scripts/node-setup.sh", privileged: true
  config.vm.provision "shell", path: "vagrant/scripts/python-setup.sh", privileged: false
  config.vm.provision "shell", path: "vagrant/scripts/redis-setup.sh", privileged: true

  config.vm.provision "shell", privileged: false, inline: <<-SHELL
    sudo apt-get install -y vim \
                            git \
                            build-essential \
                            gcc \
                            python-dev \
                            postgresql-server-dev.9.4 \
                            libxml2-dev \
                            libxslt1-dev \
                            python-dev \
                            memcached \
                            libmemcached-dev \
                            lib32z1-dev \
                            libjpeg-dev
			
  SHELL

  config.vm.provision "shell", path: "vagrant/scripts/setup-halliganhelper.sh", privileged: false

  # Create a forwarded port mapping which allows access to a specific port
  # within the machine from a port on the host machine. In the example below,
  # accessing "localhost:8000" will access port 8000 on the guest machine.
  config.vm.network "forwarded_port", guest: 8000, host: 8000

end
