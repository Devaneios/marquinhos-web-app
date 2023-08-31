#!/bin/bash

cd /home/guilherme/github-runners/marquinhos-web-app-runner/_work/marquinhos-web-app/marquinhos-web-app/dist/marquinhos-web

cp -R -f -v ./* /srv/devaneios

echo "Deployed successfully!"
