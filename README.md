# Understanding vulnerability
Allows staff to capture vulnerability and assets and have them surfaced in Single View.

## Getting started
This project uses **yarn** for dependency management and is built with Next.js.

1. Install the project dependencies
   ```
   yarn
   ```
2. Create a `.env` file based off of the `.env.sample` that exists.
2. Start running your local copy of understanding vulnerability.
   ```
   yarn dev
   ```

## Testing

### Unit tests
Unit tests are written with Jest, we are using `@testing-library/react` for React component testing.

```(bash)
yarn unit-test
```

### Integration tests
Integration tests are written with Cypress.

```(bash)
yarn int-test # starts a local copy and runs all tests
yarn cypress-open # opens Cypress for local development
```

## Deployment
Infrastructure and code are deployed to AWS using Serverless.

### Automated deployments
Merging into `master` triggers an automated deployment into the staging environment.
To promote this to production you will need to manually approve the deployment in CircleCI.
