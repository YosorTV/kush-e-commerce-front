#!/bin/bash
cp "/home/github-runner/.env.frontend.${ENV_NAME}" .env

docker build --build-arg NEXT_PUBLIC_API_URL="${NEXT_PUBLIC_API_URL}" \
             --build-arg NEXTAUTH_URL="${NEXTAUTH_URL}" \
             --build-arg PREVIEW_SECRET="${PREVIEW_SECRET}" \
             --build-arg NEXT_PUBLIC_URL="${NEXT_PUBLIC_URL}" \
             --build-arg NEXT_PUBLIC_STRAPI_URL="${NEXT_PUBLIC_STRAPI_URL}" \
             --build-arg NEXTAUTH_SECRET="${NEXTAUTH_SECRET}" \
             -t kush-e-commerce-front:"${GITHUB_RUN_ID}" . 

image_id=$(docker ps | grep kush-e-commerce-front | awk '{print $1}')
docker stop $image_id
docker rm $image_id

docker run -d --restart always -e NEXTAUTH_SECRET="${NEXTAUTH_SECRET}" \
                               -e NEXT_PUBLIC_URL="${NEXT_PUBLIC_URL}" \
                               -e NEXT_PUBLIC_API_URL="${NEXT_PUBLIC_API_URL}" \
                               -e NEXTAUTH_URL="${NEXTAUTH_URL}" \
                               -e NEXT_PUBLIC_STRAPI_API_URL="${NEXT_PUBLIC_STRAPI_API_URL}" \
                               -e PREVIEW_SECRET="${PREVIEW_SECRET}" \
                               -e NEXT_PUBLIC_STRAPI_URL="${NEXT_PUBLIC_STRAPI_URL}" \
                               -e NEXT_PUBLIC_DATABASE_URL="postgres://strapi_admin:hepiek9eephahnohth4Eihe8Vei7wa9o@dev.kush-test.pp.ua:5432/api?synchronize=true" \
                               -e GOOGLE_CLIENT_ID=86751189471-8dcn81dhp8eorhnr13js6t9dr32ofl5n.apps.googleusercontent.com \
                               -e GOOGLE_CLIENT_SECRET=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 \
                               -e JWT_SECRET=eyJhbGciOiJIUzI1NiJ9eyJjcmVhdGVkQXQiOiIyMDIzLTA5LTA5VDE3OjQwOjExLjYyM1oiLCJleHBpcmVkIjoiMjAyMy0wOS0wOVQxNzo0MDoxMS42MjNaIiwibmFtZSI6Im5hbWUiLCJ1c2VySWQiOiJpZCIsImVtYWlsIjoiZW1haWwifQ.PCwTY1WR9NnFyCzpkk7Jaf-PR-jIsMcEv_uFyiXFRDI \
                               -p 3000:3000 \
                               kush-e-commerce-front:"${GITHUB_RUN_ID}" 
