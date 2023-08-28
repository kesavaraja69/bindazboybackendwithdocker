#!/bin/bash

set -e

psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" <<-EOSQL
    CREATE USER ubuntu WITH PASSWORD 'kesava69isdragon';
    CREATE DATABASE bindazboyappdb;
    GRANT ALL PRIVILEGES ON DATABASE bindazboyappdb TO ubuntu;
EOSQL
