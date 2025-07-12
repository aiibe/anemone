
FROM alpine:3.20

ARG BINARY_PATH

COPY ${BINARY_PATH} /anemone

RUN chmod +x /anemone

EXPOSE 8080

ENTRYPOINT ["/anemone"]