FROM ruby:2.5.7
RUN apt-get update -qq && apt-get install -y nodejs postgresql-client

#RUN apt-get update && \
#  apt-get install -qq -y --no-install-recommends cron && \
#  rm -rf /var/lib/apt/lists/*

RUN apt-get update
RUN apt-get install -y vim
RUN rm -rf /var/lib/apt/lists/*

RUN mkdir /myapp
WORKDIR /myapp
COPY Gemfile /myapp/Gemfile
#COPY Gemfile.lock /myapp/Gemfile.lock
RUN bundle install
COPY . /myapp

#CMD bash -c "bundle exec whenever --update-crontab && cron -f"


# Add a script to be executed every time the container starts.
COPY entrypoint.sh /usr/bin/
RUN chmod +x /usr/bin/entrypoint.sh
ENTRYPOINT ["entrypoint.sh"]
EXPOSE 3001

# Start the main process.
CMD ["rails", "server", "-b", "0.0.0.0"]
