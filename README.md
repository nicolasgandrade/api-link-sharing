# API Link Sharing

API for a link-sharing app like LinkTree or Beacons.

## Setting up the dev server

This project relies in Auth0 authorization/authentication. That said, to run your local instance of this app, you should create a new API project in [Auth0](https://auth0.com/) and fill up the environment varibales (see the `example.env` file) related to auth0.

To run the server, make sure you have `Docker` and `docker compose` installed in your machine.

Create an `.env` file following the `example.env` template and replace the missing variables with the database info (you can check the `docker-compose.yml` file for more details). 

Run `docker compose --env-file docker-compose-dev.env up` command. This will start the containers for the NodeJS app and the PostgreSQL database.