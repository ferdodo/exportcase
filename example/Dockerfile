FROM exportcase-package

WORKDIR /exportcase/example
COPY package.json .
RUN npm install
RUN npm audit --audit-level=high
COPY . .
RUN npm run build
