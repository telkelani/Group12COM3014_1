# pull the base image
FROM node:14

# set the working direction
WORKDIR /app


# install app dependencies
COPY package.json ./

COPY package-lock.json ./

RUN npm install


# add app
COPY . ./

# start app
CMD ["npm", "start"]