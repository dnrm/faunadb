FROM node:14.16.0
WORKDIR /usr/app
COPY . .
RUN npm install --production
ENV PORT=80
ENV NODE_ENV=production
EXPOSE ${PORT}
CMD [ "node", "index.js" ]