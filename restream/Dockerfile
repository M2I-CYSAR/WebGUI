FROM alpine:latest AS run-env

WORKDIR /home

# Install all the dependencies for mjpg-streamer
RUN apk update && \
    apk add git && \
    apk add make && \
    apk add cmake && \
    apk add gcc && \
    apk add musl-dev && \
    apk add linux-headers && \
    apk add jpeg-dev

# Get mjpg-streamer and install it
RUN git clone https://github.com/jacksonliam/mjpg-streamer.git
WORKDIR /home/mjpg-streamer/mjpg-streamer-experimental
RUN make
RUN make install

WORKDIR /home

EXPOSE 5000
ENV INPUT_ADDR 0.0.0.0
ENV INPUT_PORT 0

ENTRYPOINT [ "/bin/sh", "-c", "mjpg_streamer -i \"input_http.so -H $INPUT_ADDR -p $INPUT_PORT\" -o \"output_http.so -p 5000\"" ]