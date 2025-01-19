# API Link Sharing

API for a link-sharing app like LinkTree or Beacons.

## Setting up the dev server

This project relies in Auth0 authorization/authentication. That said, to run your local instance of this app, you should create a new API project in [Auth0](https://auth0.com/) and fill up the environment varibales (see the `example.env` file) related to auth0.

To run the server, make sure you have `Docker` and `docker compose` installed in your machine.

Create an `.env` file following the `example.env` template and replace the missing variables with the database info (you can check the `docker-compose.yml` file for more details).

Run `docker compose --env-file .env -f docker-compose.dev.yml up` command. This will start the containers for the NodeJS app and the PostgreSQL database.

## Endpoints

GET / PUT Pages by the user's ID. <br />
These endpoints will retrive and update pages based in the user id. <br />
`/user/:userId/page`

GET <br />
This endpoint retrieves a page by its slug. <br />
`/pages/:slug`

## Running your own instance

To run your instace, you can modify the production `Dockerfile`, `docker-compose.yml` and `ci.yml` files according to your needs, or you can reuse the existing ones making some small modifications.

Currently, the CI pipeline builds an image using the prod Dockerfile and pushes to my repo in Docker Hub based in a release created in the Github repo. That is, if I create a release with the tag `1.2.3`, the pipeline will build and push a new image to Docker Hub with the same tag (`1.2.3`) and will also update the image with the `latest` tag.

After having the updated image in the Docker Hub repo, I just need to pull it and run the docker-compose in the production server.
