FROM exportcase-binary
FROM node:latest
COPY --from=exportcase-binary /exportcase /exportcase
WORKDIR /exportcase/package
COPY package.json .
RUN npm run get-binary
