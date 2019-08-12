!#/bin/bash

set -e

envsubst < ${HOME}/projects/manifest.yml > ${HOME}/patched_k8s.yml
envsubst < ${HOME}/project/k8s.yml > ${HOME}/patched_k8s.yml
kubectl apply -f ${HOME}/patched_k8s.yml
kubectl rollout status deployment/${PROJECT_NAME}