#!/bin/bash
cp "/home/github-runner/.env.frontend.${ENV_NAME}" .env

docker build --build-arg NEXT_PUBLIC_API_URL="${NEXT_PUBLIC_API_URL}" \
             --build-arg NEXTAUTH_URL="${NEXTAUTH_URL}" \
             --build-arg PREVIEW_SECRET="${PREVIEW_SECRET}" \
             --build-arg NEXT_PUBLIC_URL="${NEXT_PUBLIC_URL}" \
             --build-arg NEXT_PUBLIC_STRAPI_URL="${NEXT_PUBLIC_STRAPI_URL}" \
             --build-arg NEXTAUTH_SECRET="${NEXTAUTH_SECRET}" \
             -t kush-e-commerce-front:"${GITHUB_RUN_ID}" .


docker run -d --restart always -e NEXTAUTH_SECRET="${NEXTAUTH_SECRET}" \
                               -e NEXT_PUBLIC_URL="${NEXT_PUBLIC_URL}" \
                               -e NEXT_PUBLIC_API_URL="${NEXT_PUBLIC_API_URL}" \
                               -e NEXTAUTH_URL="${NEXTAUTH_URL}" \
                               -e NEXT_PUBLIC_STRAPI_API_URL="${NEXT_PUBLIC_STRAPI_API_URL}" \
                               -e PREVIEW_SECRET="${PREVIEW_SECRET}" \
                               -p 3000:3000 \
                               kush-e-commerce-front:"${GITHUB_RUN_ID}" 