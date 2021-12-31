#!/bin/bash 

until npx lt --port 19006 --subdomain encounter-app
do
  echo "Trying again"
done