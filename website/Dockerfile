# Multi-stage build to get all dependencies
FROM exportcase-ui as ui-stage
FROM exportcase-spec as spec-stage

# Final stage with complete project structure
FROM node:latest
WORKDIR /exportcase

# Copy UI files
COPY --from=ui-stage /exportcase/ui /exportcase/ui

# Copy spec files  
COPY --from=spec-stage /exportcase/spec /exportcase/spec

# Copy website files
COPY . /exportcase/website

# Set working directory to website
WORKDIR /exportcase/website

# Install dependencies
RUN npm install
RUN npm audit --audit-level=high

# Generate rules documentation
RUN node scripts/generate-rules-docs.mjs

# Build the website
RUN npm run build

# Start the server
CMD ["npm", "run", "start"]