FROM exportcase-ui AS ui-stage
FROM exportcase-spec AS spec-stage
FROM node
WORKDIR /exportcase
COPY --from=ui-stage /exportcase/ui /exportcase/ui
COPY --from=spec-stage /exportcase/spec /exportcase/spec
COPY . /exportcase/website
WORKDIR /exportcase/website
RUN npm install
RUN npm audit --audit-level=high
RUN npm run build
CMD ["npm", "run", "start"]