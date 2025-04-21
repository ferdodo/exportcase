FROM exportcase-ui
WORKDIR /exportcase/website
COPY package.json .
RUN npm install
RUN npm audit --audit-level=high
RUN cp -R /exportcase/ui/public /exportcase/website/public
COPY . .
RUN npm run build
CMD ["npm", "run", "start"]