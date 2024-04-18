FROM node:20.9.0 as builder
WORKDIR /app
COPY . .

ARG NEXT_PUBLIC_API_URL
ARG NEXTAUTH_URL
ARG PREVIEW_SECRET
ARG NEXT_PUBLIC_URL
ARG NEXT_PUBLIC_STRAPI_URL
ARG NEXTAUTH_SECRET

ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL
ENV NEXTAUTH_URL=$NEXTAUTH_URL
ENV PREVIEW_SECRET=$PREVIEW_SECRET
ENV NEXT_PUBLIC_URL=$NEXT_PUBLIC_URL
ENV NEXT_PUBLIC_STRAPI_URL=$NEXT_PUBLIC_STRAPI_URL
ENV NEXTAUTH_SECRET=$NEXTAUTH_SECRET

RUN yarn install
RUN NEXT_PUBLIC_URL=${NEXT_PUBLIC_URL} NEXT_PUBLIC_API_URL=${NEXT_PUBLIC_API_URL} yarn build

FROM node:20.9.0 as runner
WORKDIR /app

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/next.config.js ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.env ./

EXPOSE 3000

CMD ["yarn", "start"]
