FROM ruby:2.6.6

ARG INSTALL_DEPENDENCIES
RUN apt-get update -qq \
  && apt-get install -y --no-install-recommends ${INSTALL_DEPENDENCIES} \
    build-essential \
    nodejs npm \
  && apt-get clean autoclean \
  && apt-get autoremove -y \
  && rm -rf \
    /var/lib/apt \
    /var/lib/dpkg \
    /var/lib/cache \
    /var/lib/log

RUN npm i -g yarn --force

RUN mkdir /app
WORKDIR /app

COPY . /app/
ARG NODE_ENV=production
ARG BUNDLE_INSTALL_ARGS
RUN gem install bundler && bundle install ${BUNDLE_INSTALL_ARGS} \
  && bundle exec rake assets:precompile \
  && rm -rf /usr/local/bundle/cache/* \
  && find /usr/local/bundle/gems/ -name "*.c" -delete \
  && find /usr/local/bundle/gems/ -name "*.o" -delete
RUN mkdir -p tmp/pids

# CMD ["bundle", "exec", "puma", "-C", "config/puma.rb"]