FROM mongo:latest

COPY movies.json /movies.json
CMD mongoimport --host=mongodb --db=moviesdb --collection=movies --drop --type json --file=movies.json --jsonArray
