### Setup

1. Install Vagrant
2. Install virtualbox
3. Clone this repo
4. run ```vagrant up```
6. There's one last setup piece that I didn't automate:
   ```bash
   vagrant ssh
   # In the ssh shell:
   mkdir -p ~/HH/node_modules
   mkdir -p ~/vagrant_node_modules
   sudo mount --bind ~/vagrant_node_modules ~/HH/node_modules
   ```
5. Now, whenever you want to work: In two separate shells, run ```vagrant ssh```.
7. In one of the ssh sessions, run:
   ```bash
   workon hh
   npm install
   npm run webpack-watch
   ```

8. In the other ssh session, run:
  ```bash 
  workon hh
  pip install -r requirements.txt
  ./manage.py migrate # There might be an issue here about there not being a row with administrator_id=1. If so, create a superuser and migrate again.
  ./manage.py createsuperuser
  ./run.sh
  ```

You can write code on your local machine and the VM will automatically pick it up and refresh. You can access the site at `http://localhost:8000`.
