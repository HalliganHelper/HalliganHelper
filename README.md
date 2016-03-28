### Setup

1. Install Vagrant
2. Install virtualbox
3. Clone this repo
4. run ```vagrant up```
5. In two separate shells, run ```vagrant ssh```. You should have to vagrant sessions now.
6. In one of the ssh sessions, run:
   ```bash
   workon hh
   npm install --no-bin-links  # If this fails, remove the 'node_modules' folder. This command will also EAT RAM and CPU.
   npm run webpack-watch
   ```

6. In the other ssh session, run:
  ```bash 
  workon hh
  ./manage.py migrate # There might be an issue here about there not being a row with administrator_id=1. If so, create a superuser and migrate again.
  ./manage.py createsuperuser
  ./run.sh
  ```

