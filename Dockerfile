FROM node:18-alpine AS base

# Install dependencies using yarn package manager
FROM base AS dependencies
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install

FROM base AS runner
WORKDIR /app
COPY --from=dependencies /app/node_modules ./node_modules
COPY . .

ENV STRAPI_HOST $STRAPI_HOST
ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

EXPOSE 3000
CMD ["yarn", "build:and:start"]
