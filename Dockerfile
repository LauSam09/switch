# set global argument to allow access in later build stages
ARG DATABASE_URL
# build environment
FROM node:alpine as build
WORKDIR /app

# Copy application dependency manifests to the container image.
# A wildcard is used to ensure both package.json AND package-lock.json are copied.
# Copying this separately prevents re-running npm install on every code change.
COPY package*.json ./

RUN npm install --prod
RUN npm install -g react-scripts
COPY . /app
RUN npm run build

# production environment
FROM nginx:alpine
ARG DATABASE_URL
ENV DATABASE_URL ${DATABASE_URL}
COPY --from=build /app/build /usr/share/nginx/html
# overwrite default config
COPY conf/nginx.conf /tmp/template.conf
# replace proxy variable in nginx  
RUN envsubst '$DATABASE_URL' < /tmp/template.conf > /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
