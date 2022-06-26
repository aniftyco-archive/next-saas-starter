FROM node:16-alpine

WORKDIR /app

ENV PORT 5000
ENV NEXT_TELEMETRY_DISABLED true

RUN addgroup -g 1001 -S nodejs
RUN adduser -S app -u 1001

COPY package.json package-lock.json /app/
RUN npm ci


COPY . /app/
RUN npm run build

USER app
ENV NODE_ENV production
EXPOSE 5000

CMD ["npx", "next", "start"]