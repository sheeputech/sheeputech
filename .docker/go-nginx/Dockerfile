FROM nginx:1.15

LABEL Kazumasa Hirata <sheepu.tech@gmail.com>
LABEL version="2.0"

# Golang Installation
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

# NGINX Erasure and Configuration
RUN rm -rf \
      /var/lib/apt/lists/* \
      /etc/nginx/conf.d/* \
      /usr/share/nginx/html/*
COPY ./nginx/config/sheepu.conf /etc/nginx/conf.d/sheepu.conf
WORKDIR /GO/src/sheeputech/app

# Golang Package Installation
RUN go get -v -u \
      github.com/gorilla/sessions \
      github.com/gorilla/mux \
      github.com/go-sql-driver/mysql \
      golang.org/x/crypto/bcrypt

COPY start.sh /start.sh
RUN chmod 744 /start.sh \
    && apt-get -y purge \
      g++ \
      gcc \
      libc6-dev \
      make \
      pkg-config \
      wget \
      git \
    && apt-get -y clean \
    && apt-get -y autoclean \
    && apt-get -y autoremove

EXPOSE 80
CMD ["/start.sh"]