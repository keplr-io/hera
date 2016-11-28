FROM node:argon

RUN mkdir -p /app
WORKDIR /app

COPY package.json /app/
RUN npm install

COPY build /app

CMD ["/bin/bash"]
