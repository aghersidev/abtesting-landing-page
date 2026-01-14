# Pixel Reborn Landing Page

This repository contains the **landing page for the Pixel Reborn videogame**.
It is built with **React, TypeScript, and Vite**, and showcases **A/B testing and feature flags with GrowthBook**, along with **event and pageview tracking using Umami**.

---

## Pre-requisites

* **Node.js** (>= 18 recommended) and **npm**
* **Docker** and **Docker Compose** (optional, to self-host Umami and GrowthBook)

---

## Installation

### 1. Clone the repository

```bash
git clone https://github.com/aghersidev/abtesting-landing-page.git
cd abtesting-landing-page
```

### 2. Install dependencies

```bash
npm ci
```

### 3. Environment variables

Create or update a `.env` file in the project root with the following values:

```env
# ========= GrowthBook =========
VITE_GROWTHBOOK_API_HOST=https://cdn.growthbook.io
VITE_GROWTHBOOK_CLIENT_KEY=sdk-abc123
VITE_GROWTHBOOK_DEV_MODE=true

# ========= Umami =========
VITE_UMAMI_SCRIPT_URL=https://analytics.tudominio.com/script.js
VITE_UMAMI_WEBSITE_ID=xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
VITE_ENABLE_ANALYTICS=true

# ========= App =========
VITE_SITE_ID=pixelreborn
```

> **Note**
> These are **public client-side keys** used by the application to communicate with GrowthBook and Umami.
> Do **not** store private or admin credentials in this file.

### 4. Run the app in development mode

```bash
npm run dev
```

The app will be available at:

```
http://localhost:5173
```

---

## Self-hosting Umami and GrowthBook (Optional)

### Umami

You can run Umami locally using Docker:

```bash
docker run -d \
  -e DATABASE_URL=postgres://umami:umami@localhost:5432/umami \
  -e UMAMI_ALLOWED_ORIGINS=http://localhost:5173 \
  -p 3000:3000 \
  --name umami umami/umami
```

Access:

```
http://localhost:3000
```

From the Umami dashboard:

1. Create a **website**
2. Copy the **Website ID**
3. Set it as `VITE_UMAMI_WEBSITE_ID` in your `.env`

---

### GrowthBook

Example `docker-compose.yml` for GrowthBook:

```yaml
version: "3.8"

services:
  postgres:
    image: postgres:15
    environment:
      POSTGRES_USER: gbuser
      POSTGRES_PASSWORD: gbpass
      POSTGRES_DB: growthbook
    ports:
      - "5432:5432"

  growthbook-api:
    image: growthbook/growthbook-api:latest
    depends_on:
      - postgres
    environment:
      DATABASE_URL: postgres://gbuser:gbpass@postgres:5432/growthbook
      PORT: 3100
    ports:
      - "3100:3100"

  growthbook-ui:
    image: growthbook/growthbook-ui:latest
    depends_on:
      - growthbook-api
    environment:
      REACT_APP_GB_API_HOST: http://localhost:3100
    ports:
      - "3000:3000"
```

Access the GrowthBook UI at:

```
http://localhost:3000
```

From there:

1. Create a project
2. Generate a **Client Key**
3. Set it as `VITE_GROWTHBOOK_CLIENT_KEY` in your `.env`

---

## Configure Feature Flags

1. Log in to the **GrowthBook UI**
2. Create a **Feature Flag** named:

```
mediaType
```

3. Add the following variations:

* `"trailer"`
* `"images"`

This flag is used by the landing page to switch media content for A/B testing.

---

## Usage

* The app uses **GrowthBook** for feature flags and A/B testing.
* **Umami** tracks:

  * Page views
  * Custom events
* Analytics can be toggled using:

```env
VITE_ENABLE_ANALYTICS=true
```

---

## License

This project is licensed under the **MIT License**.
See the `LICENSE` file for more details.
