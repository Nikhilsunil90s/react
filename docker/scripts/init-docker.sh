cp ./docker/api/config.json ./backend/config/config.json
cp ./docker/web/API.tsx ./frontend/utils/API.tsx

docker-compose build austinwilder-web-app
docker-compose build austinwilder-api-app
docker-compose up -d

docker exec -it austinwilder-api-app npx sequelize-cli db:migrate

#docker exec -i austinwilder-db sh /root/sample-db/import.sh

exit
