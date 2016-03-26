# -*- mode: ruby -*-
# vi: set ft=ruby :

Vagrant.configure(2) do |config|

  config.vm.box = "ubuntu/trusty64"
  config.vm.hostname = "HH"
  config.vm.provider "virtualbox" do |vm|
    vm.memory = 1024
    vm.cpus = 2
  end

  # Create a forwarded port mapping which allows access to a specific port
  # within the machine from a port on the host machine. In the example below,
  # accessing "localhost:8000" will access port 8000 on the guest machine.
  config.vm.network "forwarded_port", guest: 8000, host: 8000

  config.vm.synced_folder "./", "/vagrant"
  config.vm.provision "shell", inline: "sudo apt-get update --fix-missing && sudo apt-get install -y python-pip python-dev && sudo pip install ansible==1.9.2 && sudo cp /usr/local/bin/ansible /usr/bin/ansible"

  # From here:
  # http://docs.ansible.com/ansible/guide_vagrant.html#vagrant-setup
  config.ssh.insert_key = false
  # config.vm.define "vagrant"
  config.vm.provision "ansible_local" do |ansible|
    ansible.install = true
    ansible.verbose = "v"
    ansible.playbook = "ansible/local_playbook.yml"
    # ansible.extra_vars = "ansible/vars/default.yml"
  end
end
