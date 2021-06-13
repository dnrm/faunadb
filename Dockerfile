FROM node:14.16.0
WORKDIR /usr/app
COPY . .
RUN npm install --production
ENV PORT=8080
EXPOSE ${PORT}
CMD [ "node", "index.js" ]