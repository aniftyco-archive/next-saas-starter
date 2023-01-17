# Base
FROM node:16-alpine AS base
RUN npm i -g npm@latest
WORKDIR /app
ENV NEXT_TELEMETRY_DISABLED true

# Build
FROM base AS builder

COPY . .
RUN npm ci
RUN npm run build

# Run
FROM base as runner

ENV PORT 5000
ENV NODE_ENV production
ENV PATH $PATH:/app/node_modules/.bin
ENV NEXT_TELEMETRY_DISABLED true

COPY --from=builder /app/node_modules/ /app/node_modules/
COPY --from=builder /app/ /app/

EXPOSE 5000
ENTRYPOINT ["npx"]
CMD ["next", "start"]