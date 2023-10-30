<!--

This source file is part of the Stanford Spezi Template Web Dashboard open-source project

SPDX-FileCopyrightText: 2023 Stanford University and the project authors (see CONTRIBUTORS.md)

SPDX-License-Identifier: MIT

-->

# Stanford Spezi Template Web Dashboard

[![Build and Test](https://github.com/StanfordSpezi/SpeziTemplateWebDashboard/actions/workflows/build-and-test.yml/badge.svg)](https://github.com/StanfordSpezi/SpeziTemplateWebDashboard/actions/workflows/build-and-test.yml)
[![Deployment](https://github.com/StanfordSpezi/SpeziTemplateWebDashboard/actions/workflows/main.yml/badge.svg)](https://github.com/StanfordSpezi/SpeziTemplateWebDashboard/actions/workflows/main.yml)
[![codecov](https://codecov.io/gh/StanfordSpezi/SpeziTemplateWebDashboard/graph/badge.svg?token=dfQW5eZ2up)](https://codecov.io/gh/StanfordSpezi/SpeziTemplateWebDashboard)
[![DOI](https://zenodo.org/badge/DOI/10.5281/zenodo.10052055.svg)](https://doi.org/10.5281/zenodo.10052055)

## How To Use This Template

The template repository contains a template for a Stanford Spezi web dashboard project providing automated GitHub Actions and setups for code linting, testing & test coverage reports, docker deployments, a docker compose setup, local packages for modular deployment, and documentation generation & deployment.

Follow these steps to customize it to your needs:

1. Rename the Stanford Spezi Template Web Dashboard project.
2. Modify, add, or remove the local packages found at `/packages/*` to separate code into smaller modules.
3. Add dependencies and edit the project in `/app` and the local Node packages.

The main application is automatically deployed to https://stanforspezi.github.io/SpeziTemplateWebDashboard/.

The documentation of the local packages is automatically deployed to https://stanfordspezi.github.io/SpeziTemplateWebDashboard/docs.

## Getting Started

You can run the project using the following command. You will need to install Node.js and npm, e.g., using [homebrew (recommended for macOS)](https://formulae.brew.sh/formula/node) or the official [Node.js installer](https://nodejs.org/en/download).

1. Install All Dependencies

```bash
npm install
```

1. Start the Next.js Application

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.<!-- markdown-link-check-disable-line -->

You can edit the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

## Docker

1. [Install Docker](https://docs.docker.com/get-docker/) on your machine.
2. Build the image and run the docker compose setup: `docker compose -f docker-compose-development.yml up`.

You can view your images created with `docker images`.

Open [http://localhost](http://localhost) with your browser to see the result. You can visit [http://localhost:8080](http://localhost:8080) to see the reverse proxy setup before the main application.<!-- markdown-link-check-disable-line -->

The `docker-compose.yml` setup contains a production-ready setup using a reverse proxy.

Every version of the application on the `main` branch is automatically packaged into docker images using the `main` tag. Every release is also published using the `latest` and respective version tags.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## License

This project is licensed under the MIT License. See [Licenses](https://github.com/StanfordSpezi/SpeziTemplateWebDashboard/tree/main/LICENSES) for more information.

## Contributors

This project is developed as part of the Stanford Byers Center for Biodesign at Stanford University.
See [CONTRIBUTORS.md](https://github.com/StanfordSpezi/SpeziTemplateWebDashboard/tree/main/CONTRIBUTORS.md) for a full list of all Stanford Spezi Template Web Dashboard contributors.

![Spezi Footer](https://raw.githubusercontent.com/StanfordSpezi/.github/main/assets/FooterLight.png#gh-light-mode-only)
![Spezi Footer](https://raw.githubusercontent.com/StanfordSpezi/.github/main/assets/FooterDark.png#gh-dark-mode-only)
