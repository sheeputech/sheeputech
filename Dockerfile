FROM nginx:1.15

LABEL Kazumasa Hirata <sheepu.tech@gmail.com>
LABEL version="3.0"

# install go
RUN apt-get update && apt-get install -y \
      g++ \
      gcc \
      libc6-dev \
      make \
      pkg-config \
      wget \
      git
ENV GOLANG_VERSION=1.11.2 \
      goRelArch='linux-amd64' \
      goRelSha256='1dfe664fa3d8ad714bbd15a36627992effd150ddabd7523931f077b3926d736d'
RUN wget -O go.tgz "https://golang.org/dl/go${GOLANG_VERSION}.${goRelArch}.tar.gz" \
      && echo "${goRelSha256} *go.tgz" | sha256sum --check - \
      && tar -C /usr/local -xzf go.tgz \
      && rm go.tgz
ENV PATH=/usr/local/go/bin:$PATH \
      GOPATH=/GO \
      PATH=$GOPATH/bin:/usr/local/go/bin:$PATH
RUN mkdir -p "$GOPATH/src" "$GOPATH/bin" && chmod -R 777 "$GOPATH"

# set up nginx
RUN rm -rf \
      /var/lib/apt/lists/* \
      /etc/nginx/conf.d/* \
      /usr/share/nginx/html/*
COPY ./.docker/nginx/config/sheepu.conf /etc/nginx/conf.d/sheepu.conf
WORKDIR /GO/src/sheeputech/app

# go module
ENV GO111MODULE=on
COPY ./app .
RUN  go mod vendor \
      && go mod download

# start
COPY start.sh /start.sh
RUN chmod 744 /start.sh
EXPOSE 80
CMD ["/start.sh"]