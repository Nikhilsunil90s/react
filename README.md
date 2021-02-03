# to install

install docker


on windows
use powershell

then run to initialize docker containers. This is only suppose to be run on initialization

in windows:
.\docker\scripts\init-docker.bat

in mac/linux:
use terminal

./docker/scripts/init-docker.sh


#to start docker run
docker-compose up -d


#to stop docker run
docker-compose down -d



web container
http://localhost:9335

to terminal into instance
docker exec -it austinwilder-web-app /bin/bash

to force rebulid container and restart
docker-compose build --no-cache austinwilder-web-app
docker-compose down
docker-compose up -d



api container
http://localhost:9336

to terminal into instance
docker exec -it austinwilder-api-app /bin/bash

to force rebulid container and restart
docker-compose build --no-cache austinwilder-api-app
docker-compose down
docker-compose up -d


phpmyadmin
http://localhost:9337

to use phpmyadmin use db credentials from docker-compose.yml
L:root
P:owireu23ks@SdC


this is only for dev testing so not used for production


db:
to terminal into mysql
docker exec -it austinwilder-db /bin/bash


DB MIGRATIONS:
to run migration do
npx sequelize-cli db:migrate
docker exec -it austinwilder-api-app npx sequelize-cli db:migrate



Troubleshooting
If for some reason containers are not running or showing node errors not finding libraries then reset all using

run:
docker/scripts/reset-all-docker.bat


if getting max depth exceeded then run
docker rmi -f $(docker images -a -q)




For Production

npm install then run api
for next web
pm2 start "next dev -p 9335" --name app

for api
pm2 start "PORT=9336 node server.js" --name api


Project Description


