#!/bin/bash 

until npx lt --port 3000 --subdomain encounter-dev
do
  echo "Trying again"
done