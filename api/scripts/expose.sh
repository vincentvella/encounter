#!/bin/bash 

until npx lt --port 3000 --subdomain encounter-dev-1
do
  echo "Trying again"
done