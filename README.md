### Setup

1. Install Vagrant
2. Install virtualbox
3. Clone this repo
4. run ```vagrant up```
5. In two separate shells, run ```vagrant ssh```. You should have to vagrant sessions now.
6. In one of the ssh sessions, run:
   ```bash
   cd HalliganHelper
   npm run webpack-watch
   ```

6. In the other ssh session, run:
  ```bash 
  workon HalliganHelper
  cd HalliganHelper 
  ./manage.py migrate # There might be an issue here about there not being a row with administrator_id=1. If so, create a superuser and migrate again.
  ./manage.py createsuperuser
  ./manage.py runserver 0.0.0.0:8000
  ```

