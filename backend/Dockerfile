FROM node:16

WORKDIR /backend
COPY backend/package.json .
RUN npm install
COPY backend .
CMD npm start