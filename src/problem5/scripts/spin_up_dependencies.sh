#!/bin/bash
export BASE_DIR=$(pwd)

docker-compose -f $BASE_DIR/docker/docker-compose.yml up -d