ARG VERSION=latest
FROM --platform=linux/amd64 denoland/deno:${VERSION} as builder
WORKDIR /app
COPY . /app
ENV APP_ENV=$APP_ENV
#RUN deno task build
CMD ["deno", "task", "run"]

#FROM --platform=linux/amd64 denoland/deno:${VERSION}
#EXPOSE 8000
#COPY --from=builder /app/.ultra /app
#WORKDIR /app
#CMD ["deno", "task", "start"]
