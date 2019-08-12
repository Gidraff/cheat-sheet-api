!#/bin/bash

set -e

docker build -t ${PROJECT_NAME} .
docker tag ${PROJECT_NAME} eu.gcr.io/${GOOGLE_PROJECT_ID}/${PROJECT_NAME}:${CIRCLE_SHA1}
gcloud auth print-access-token | docker login -u oauth2accesstoken --password-stdin https://eu.gcr.io
docker push eu.gcr.io/${GOOGLE_PROJECT_ID}/${PROJECT_NAME}:${CIRCLE_SHA1}