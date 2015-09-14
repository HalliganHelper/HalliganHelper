### Setup

1. Install Vagrant
2. Install virtualbox
3. Clone this repo
4. run ```vagrant up```
5. run ```vagrant ssh```
6. In the ssh session:
    *. Change the HalliganAvailability/secret_template.py to HalliganAvailability/secret.py
    *. Modify the variables within to contain the correct information

6. In the ssh session, run:
    *. ```workon HalliganHelper```
    *. ```cd HalliganHelper ```
    *. ```./manage.py migrate```
    *. ```./manage.py createsuperuser```
    *. ```./manage.py runserver 0.0.0.0:8000```

