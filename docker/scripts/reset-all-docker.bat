docker-compose down &
docker-compose build --no-cache austinwilder-api-app
docker-compose build --no-cache austinwilder-web-app
docker-compose up -d
docker exec -it austinwilder-api-app npx sequelize-cli db:migrate
