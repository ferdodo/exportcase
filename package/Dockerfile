FROM exportcase-binary
FROM node:latest
COPY --from=exportcase-binary /exportcase /exportcase
WORKDIR /exportcase/package
COPY package.json .
COPY bin/exportcase.js ./bin/exportcase.js
COPY scripts scripts
RUN npm run get-binaries

