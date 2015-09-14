### Setup

1. Install Vagrant
2. Install virtualbox
3. Clone this repo
4. run ```vagrant up```
5. run ```vagrant ssh```
6. In the ssh session
  1. Change the HalliganAvailability/secret_template.py to HalliganAvailability/secret.py
  2. Modify the variables within to contain the correct information

6. In the ssh session, run:
  1. ```workon HalliganHelper```
  2. ```cd HalliganHelper ```
  3. ```./manage.py migrate```
  4. ```./manage.py createsuperuser```
  5. ```./manage.py runserver 0.0.0.0:8000```

